import * as botpress from '.botpress'
import { Request } from '@botpress/sdk'
import { checkoutSchema } from 'src/schemas/saleor'

type Implementation = ConstructorParameters<typeof botpress.Integration>[0]
type RegisterFunction = Implementation['handler']
type IntegrationContext = Parameters<RegisterFunction>[0]['ctx']
type Client = Parameters<RegisterFunction>[0]['client']

export const fireBasketUpdated = async ({
  req,
  client,
  logger,
}: {
  req: Request
  client: Client
  ctx: IntegrationContext
  logger: any
}) => {
  const saleorEvent = JSON.parse(req.body || '')

	console.log('fireBasketUpdated event', saleorEvent)

  const payload = {
    order_id: saleorEvent.id,
    confirmation_number: saleorEvent.confirmation_number,
    created_at: saleorEvent.created_at,
    currency: saleorEvent.currency,
    current_subtotal_price: saleorEvent.current_subtotal_price,
    current_total_discounts: saleorEvent.current_total_discounts,
    current_total_price: saleorEvent.current_total_price,
    current_total_tax: saleorEvent.current_total_tax,
    customer_locale: saleorEvent.customer_locale,
    order_status_url: saleorEvent.order_status_url,
    fullBody: req,
  }

  const parsedObject = checkoutSchema.parse(payload)

  logger.forBot().info(`Recieved an order created event for ${saleorEvent.id}`)

  await client.createEvent({
    type: 'basketUpdated',
    payload: parsedObject,
  })
}
