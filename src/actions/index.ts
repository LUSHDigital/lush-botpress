import type { IntegrationProps } from '.botpress'
import { addToBasket } from './add-to-basket'
import { addUserToCheckout } from './add-user-checkout'
import { upsertShippingAddress } from './upsert-shipping-address'
import { upsertBillingAddress } from './upsert-billing-address'

export default {
  addToBasket,
  addUserToCheckout,
  upsertShippingAddress,
  upsertBillingAddress
} satisfies IntegrationProps['actions']
