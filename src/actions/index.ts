import type { IntegrationProps } from '.botpress'
import { addToBasket } from './add-to-basket'
import { upsertShippingAddress } from './upsert-shipping-address'
import { upsertBillingAddress } from './upsert-billing-address'

export default {
  addToBasket,
  upsertShippingAddress,
  upsertBillingAddress
} satisfies IntegrationProps['actions']
