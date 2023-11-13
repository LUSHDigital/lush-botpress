import { z } from 'zod'
import { INTEGRATION_NAME } from 'src/const'

export const basketUpdatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:basketUpdated`).optional(),
  id: z.string()
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
  id: z.string()
})

export type basketUpdated = z.infer<typeof basketUpdatedSchema>
