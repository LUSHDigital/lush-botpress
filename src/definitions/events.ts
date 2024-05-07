import {
  basketUpdatedSchema,
  checkoutPaidSchema,
  checkoutUpdatedSchema,
  productCreatedSchema,
  productUpdatedSchema
} from '../schemas'

const basketUpdated = {
  schema: basketUpdatedSchema,
  ui: {}
}
const checkoutPaid = {
  schema: checkoutPaidSchema,
  ui: {}
}
const checkoutUpdated = {
  schema: checkoutUpdatedSchema,
  ui: {}
}
const productCreated = {
  schema: productCreatedSchema,
  ui: {}
}
const productUpdated = {
  schema: productUpdatedSchema,
  ui: {}
}

export const events = {
  basketUpdated,
  checkoutPaid,
  checkoutUpdated,
  productCreated,
  productUpdated
}