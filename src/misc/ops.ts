import type { Client } from '.botpress'
import type { IntegrationLogger } from '@botpress/sdk/dist/integration/logger'
import type { IntegrationContext } from '@botpress/sdk'
import type { Configuration } from '.botpress/implementation/configuration'

import app, { Webhook } from 'src/gql/app'
import createWebhook from 'src/gql/createWebhook'
import deleteWebhook from 'src/gql/deleteWebhook'
import type { Product } from './types'
import { getUserAndConversation } from './utils'

export async function createOrGetWebhook (url: string, token: string, wyvernURL: string): Promise<Webhook> {
  const data = await app(token, wyvernURL)
  const previous = data.app.webhooks.find((webhook) => {
    return webhook.targetUrl === url
  })

  // Found a webhook with the same URL so no need to create a new one.
  if (previous != null) {
    return previous
  }

  // New url, new hook.
  return await createWebhook(wyvernURL, {
    input: {
      asyncEvents: ['ANY_EVENTS'],
      isActive: true,
      name: 'Botpress',
      targetUrl: url
    }
  }, token)
}

export async function removeWebhook (url: string, token: string, wyvernURL: string): Promise<void> {
  console.log('removeWebhook invoked')
  const data = await app(token, wyvernURL)
  const previous = data.app.webhooks.find((webhook) => {
    return webhook.targetUrl === url
  })

  // Found a webhook with the same URL so no need to create a new one.
  if (previous != null) {
    console.log('found old webhook, will remove')
    const x = await deleteWebhook(previous.id, token, wyvernURL)
    console.log('x', x)
    return
  }

  console.log('no webhook found')
}

interface productHandlerArgs {
  event: Product[]
  client: Client
}

interface checkoutHandlerArgs {
  event: any
  client: Client
  ctx: IntegrationContext<Configuration>
  logger: IntegrationLogger
}

export async function handleProductCreated ({ event, client }: productHandlerArgs): Promise<void> {
  console.log('Not implemented', event)
}
export async function handleProductUpdated ({ event, client }: productHandlerArgs): Promise<void> {
  console.log('Not implemented', event)
}
export async function handleCheckoutCreated ({ event, client, logger }: checkoutHandlerArgs): Promise<void> {
  console.log('Not implemented', event)
  const basket = event[0]
  if (basket == null) {
    return
  }
  const y = await client.createEvent({
    type: 'basketUpdated',
    payload: {
      id: basket.id,
      lines: basket.lines
    },
    ...(await getUserAndConversation({
      userId: basket.metadata.user_id || '',
      channelId: basket.id,
      channel: 'channel'
    }, client, logger))
  })
  console.log('handleCheckoutCreated', y)
}

export async function handleCheckoutUpdated ({ event, client, logger }: checkoutHandlerArgs): Promise<void> {
  logger.forBot().debug('event.checkout', JSON.stringify(event.checkout, null, 2))

  const x = await client.createMessage({
    type: 'text',
    // tags: { userId: event.checkout.user.externalReference },
    tags: { id: event.checkout.conversationUser + Math.random() },
    payload: {
      text: 'Your basket has been updated from integration'
    },
    conversationId: event.checkout.conversationId,
    userId: event.checkout.conversationUser
  }).catch((error) => {
    logger.forBot().error(`checkout updated createMessage ~> ${JSON.stringify(error)}`)
  })

  // const y = await client.createEvent({
  //   type: 'basketUpdated',
  //   payload: {
  //     id: '94375905845',
  //     checkout: event.checkout
  //   },
  //   conversationId: event.checkout.conversationId,
  //   userId: event.checkout.conversationUser
  // }).catch((error) => {
  //   logger.forBot().error(`checkout updated createEvent ~> ${JSON.stringify(error)}`)
  // })
  // logger.forBot().debug('handleCheckoutUpdated createEvent', y)
  // logger.forBot().debug('handleCheckoutUpdated createEvent stringed', JSON.stringify(y))
}

export async function handleCheckoutPaid ({ event, client }: checkoutHandlerArgs): Promise<Void> {
  console.log('Not implemented', event)
}
