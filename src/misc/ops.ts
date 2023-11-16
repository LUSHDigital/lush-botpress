import type { Client } from '.botpress'
import type { IntegrationLogger } from '@botpress/sdk/dist/integration/logger'
import type { IntegrationContext } from '@botpress/sdk'
import type { Configuration } from '.botpress/implementation/configuration'

import app, { Webhook } from 'src/gql/app'
import createWebhook from 'src/gql/createWebhook'
import deleteWebhook from 'src/gql/deleteWebhook'
import { Checkout, Product } from './types'
import { getUserAndConversation } from './utils'
import { BUILD_VERSION } from 'src/const'

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

const x = {
  __typename: 'CheckoutUpdated',
  checkout: {
    user: { externalReference: 'auth0|635a3bcbefb61e27d633fc40' },
    lines: [{
      quantity: 1,
      variant: { name: '10 / 65 / 65g / CITES: No / Weighted: No', product: { name: 'Tranquil' } },
      totalPrice: { gross: { amount: 4, currency: 'GBP' } }
    },
    {
      quantity: 9,
      variant: { name: '1 / 500g', product: { name: "Ro's Argan" } },
      totalPrice: { gross: { amount: 148.5, currency: 'GBP' } }
    }, {
      quantity: 2,
      variant: { name: '12 / 45g', product: { name: 'Dream Cream' } },
      totalPrice: { gross: { amount: 5.5, currency: 'GBP' } }
    }],
    totalPrice: { gross: { amount: 158, currency: 'GBP' } }
  },
  errors: [{ message: 'You need one of the following permissions: MANAGE_USERS, OWNER', locations: [{ line: 18, column: 9 }], path: ['event', 'checkout', 'user'], extensions: { exception: { code: 'PermissionDenied' } } }]
}

interface checkoutHandlerArgs {
  event: typeof x
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
  logger.forBot().info('Version: ' + BUILD_VERSION)
  logger.forBot().info('Received checkout updated event')
  logger.forBot().debug(`checkout updated event ~> ${JSON.stringify(event)}`)

  const y = await client.createEvent({
    type: 'basketUpdated',
    payload: {
      checkout: event.checkout
    },
    ...(await getUserAndConversation({
      userId: event.checkout.user.externalReference,
      channelId: 'channel',
      channel: 'channel'
    }, client, logger))
  })
  logger.forBot().debug('handleCheckoutCreated', y)
  logger.forBot().debug('handleCheckoutCreated stringed', JSON.stringify(y))
}

export async function handleCheckoutPaid ({ event, client }: checkoutHandlerArgs): Promise<Void> {
  console.log('Not implemented', event)
}
