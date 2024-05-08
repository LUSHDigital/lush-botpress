import type { Client } from '.botpress'
import type { IntegrationLogger } from '@botpress/sdk/dist/integration/logger'
import type { IntegrationContext } from '@botpress/sdk'
import type { Configuration } from '.botpress/implementation/configuration'
import type { Product } from './types'

import app, { type Webhook } from 'src/gql/app'
import createWebhook from 'src/gql/createWebhook'
import deleteWebhook from 'src/gql/deleteWebhook'
// import { getUserAndConversation } from './utils'

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
  const { webhook } = await createWebhook(wyvernURL, {
    input: {
      asyncEvents: ['ANY_EVENTS'],
      isActive: true,
      name: 'Botpress',
      targetUrl: url
    }
  }, token)
  return webhook
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
}

export async function handleCheckoutUpdated ({ event, client, logger }: checkoutHandlerArgs): Promise<void> {
  if (!event.checkout.botpressConversationId) {
    return
  }

  logger.forBot().debug('handleCheckoutUpdated[event]', JSON.stringify(event, null, 2))

  const x = await client.createMessage({
    type: 'text',
    tags: { id: event.checkout.user.externalReference },
    // tags: { id: event.checkout.botpressConversationId },
    payload: {
      text: 'Your basket has been updated from integration'
    },
    conversationId: event.checkout.botpressConversationId,
    userId: event.checkout.botpressUserId
  }).catch((error) => {
    logger.forBot().error(`handleCheckoutUpdated[createMessage[catch]] ~> ${JSON.stringify(error)}`)
  })

  logger.forBot().debug('handleCheckoutUpdated[x] ~>', x)

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

export async function handleCheckoutPaid ({ event, client }: checkoutHandlerArgs): Promise<void> {
  console.log('Not implemented', event)
}
