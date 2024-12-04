import { z } from '@botpress/sdk'
import { INTEGRATION_NAME } from 'src/const'

export const basketUpdatedSchema = z.object({
  order_id: z.string(),
  confirmation_number: z.string(),
  created_at: z.string(),
  currency: z.string(),
  current_subtotal_price: z.string(),
  current_total_discounts: z.string(),
  current_total_price: z.string(),
  current_total_tax: z.string(),
  customer_locale: z.string(),
  order_status_url: z.string(),
  fullBody: z.any()
})
export const checkoutPaidSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:checkoutPaid`).optional(),
  id: z.string()
})
export const checkoutUpdatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:checkoutUpdated`).optional(),
  id: z.string()
})
export const productCreatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:productCreated`).optional(),
  id: z.string()
})

const variant = z.object({
  variant_id: z.string(),
  commerce_id: z.string(),
  name: z.string(),
  available: z.boolean(),
  price: z.string(),
})

export const productUpdatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:productUpdated`).optional(),
  product: z.object({
    commerce_id: z.string(),
    name: z.string(),
    type: z.string(),
    average_rating: z.number().optional(),
  }),
  variants: z.object({
    uk: z.array(variant),
  })
})

export type basketUpdated = z.infer<typeof basketUpdatedSchema>
