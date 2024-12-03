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
export const productUpdatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:productUpdated`).optional(),
  product: z.object({
    commerce_id: z.string(),
    name: z.string(),
    type: z.string(),
  }),
  variants: z.array(z.object({
    commerce_id: z.string(),
    name: z.string(),
    available_channels: z.array(z.string()),
    discontinued_in: z.array(z.string()),
    unavailable_in: z.array(z.string()),
    price_uk: z.string().optional(),
    price_nl: z.string().optional(),
    price_at: z.string().optional(),
    price_ca: z.string().optional(),
    price_cz: z.string().optional(),
    price_de: z.string().optional(),
    price_es: z.string().optional(),
    price_fr: z.string().optional(),
    price_hk: z.string().optional(),
    price_ie: z.string().optional(),
    price_it: z.string().optional(),
    price_jp: z.string().optional(),
    price_mena: z.string().optional(),
    price_nz: z.string().optional(),
    price_pl: z.string().optional(),
    price_us: z.string().optional(),
  }))
})

export type basketUpdated = z.infer<typeof basketUpdatedSchema>
