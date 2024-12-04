import { addToBasket } from './add-to-basket'
import { addUserToCheckout } from './add-user-checkout'
import { upsertShippingAddress } from './upsert-shipping-address'
import { upsertBillingAddress } from './upsert-billing-address'
import {fetchReviews} from "./fetch-reviews";

export default {
  addToBasket,
  addUserToCheckout,
  fetchReviews,
  upsertShippingAddress,
  upsertBillingAddress,
  getCustomerOrders: async () => ({}),
  removeFromBasket: async () => ({}),
  updateQuantity: async () => ({}),
}
