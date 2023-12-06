import type { IntegrationProps } from '.botpress'
import { SALEOR_SIGNATURE_HEADER, SALEOR_EVENT_HEADER } from './const'
import { verifyWebhook } from './misc/hmac'
import {
  handleProductCreated,
  handleProductUpdated,
  handleCheckoutCreated,
  handleCheckoutUpdated,
  handleCheckoutPaid
} from './misc/ops'

export const handler: IntegrationProps['handler'] = async ({ req, logger, client, ctx }) => {
  // In Saleor 4 they're dropping x- prefixed headers
  const { body, headers } = req
  const signature = headers[`x-${SALEOR_SIGNATURE_HEADER}`] || headers[SALEOR_SIGNATURE_HEADER]
  const eventName = headers[`x-${SALEOR_EVENT_HEADER}`] || headers[SALEOR_EVENT_HEADER] || ''

  // if (!(body && signature)) {
  //   logger.forBot().warn('Body or signature is missing')
  //   return
  // }
  // const { saleorDomain } = ctx.configuration
  // const isVerified = await verifyWebhook(req, saleorDomain, logger)

  // if (isVerified === false) {
  //   logger.forBot().warn('Invalid webhook secret')
  //   return
  // }

  const event = JSON.parse(body)

  switch (eventName) {
    case 'product_created':
      return await handleProductCreated({ event, client })
    case 'product_updated':
      return await handleProductUpdated({ event, client })
    case 'product_variant_updated':
      return await handleProductUpdated({ event, client })
    case 'checkout_created':
      return await handleCheckoutCreated({ event, client })
    case 'checkout_updated':
      return await handleCheckoutUpdated({ event, client, logger })
    case 'checkout_fully_paid':
      return await handleCheckoutPaid({ event, client })
    default:
      logger.forBot().warn(`No handler for ${eventName}`)
  }
}
