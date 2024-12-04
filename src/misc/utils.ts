import type {Conversation} from '@botpress/client'
import type {IntegrationLogger} from "@botpress/sdk";
import type {AckFunction, Client, Product, TransformedProduct, TransformedVariant} from './types'

import {INTEGRATION_NAME} from '../const'

export const getTag = (tags: Record<string, string>, name: string): string | undefined => {
  return tags[`${INTEGRATION_NAME}:${name}`]
}

export function getConversationId (conversation: Conversation): number {
  const id = getTag(conversation.tags, 'number')

  if (!id) {
    throw Error(`No chat found for conversation ${conversation.id}`)
  }

  return Number(id)
}

export async function ackMessage (messageId: number, ack: AckFunction): Promise<void> {
  await ack({ tags: { id: messageId.toString() } })
}

interface UserConversation {
  userId: string
  conversationId: string
}

export const getUserAndConversation = async (
  props: { userId: string, channelId: string | number, channel: string },
  client: Client,
  logger: IntegrationLogger
): Promise<UserConversation> => {
  const { userId, channelId, channel } = props
  logger.forBot().debug('getUserAndConversation', { userId, channelId, channel })
  const { conversation } = await client.getOrCreateConversation({
    channel: 'channel',
    tags: { id: userId }
  })
  logger.forBot().debug('getUserAndConversation', { conversation })

  const { user } = await client.getOrCreateUser({
     tags: { 
      id: props.userId 
    } 
  })

  logger.forBot().debug('user', user)
  return {
    userId: user.id,
    conversationId: conversation.id
  }
}

export function stripLastSlash (inputString: string): string {
  // Check if the last character is a forward slash
  if (inputString.endsWith('/')) {
    // If so, remove it and return the modified string
    return inputString.slice(0, -1)
  } else {
    // Otherwise, return the original string unchanged
    return inputString
  }
}

export function transformProducts(productData: Product, logger: IntegrationLogger): { variants: Record<string, TransformedVariant[]>; product: TransformedProduct } {
  const channels = ["uk"]; // Channels we support.

  let transformedProduct: TransformedProduct = {
    commerce_id: productData.uk?.id!,
    name: productData.uk?.name!,
    type: productData.uk?.type?.values?.[0]?.name || "",
    average_rating: productData.uk?.rating,
  };

  let variants: Record<string, TransformedVariant[]> = {};

  for (const channel in productData) {
    if (productData.hasOwnProperty(channel)) {
      const product = productData[channel];

      if (!product || !product.variants || !channels.includes(channel)) {
        continue;
      }

      // Transform variants
      for (const variant of product.variants) {
        const formattedPrice = new Intl.NumberFormat('en', {
          style: 'currency',
          currency: variant.pricing.price.gross.currency
        }).format(variant.pricing.price.gross.amount);

        const transformedVariant: TransformedVariant = {
          name: variant.name || "",
          commerce_id: product.id,
          available: false,
          variant_id: variant.id,
          price: formattedPrice
        };

        // Get name.
        if (variant.attributes) {
          for (const attribute of variant.attributes) {
            if (attribute.attribute.slug === 'display_weight') {
              const weighted =  attribute.values.map(value => value.name)[0]
              if (weighted) {
                transformedVariant.name = weighted
              }
              break;
            }
          }
        }

        // Get availability.
        if (variant.attributes) {
          for (const attribute of variant.attributes) {
            if (attribute.attribute.slug === 'availability_commerce_web') {
              for (const value of attribute.values) {
                const [channelCode, _, status] = value.slug.split('_');

                if (!channelCode) { // Shouldn't happen but #TS.
                  continue;
                }

                if (!channels.includes(channelCode)) { // Skip if channel unsupported.
                  continue;
                }

                if (status === 'available') {
                  transformedVariant.available = true;
                }
              }
            }
          }
        }

        if (variants[channel]) {
          variants[channel].push(transformedVariant);
        } else {
          variants[channel] = [transformedVariant];
        }
      }
    }
  }

  logger.forBot().debug(variants);

  return { variants, product: transformedProduct };
}