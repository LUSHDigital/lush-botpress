import { z } from 'zod'
import { INTEGRATION_NAME } from 'src/const'

export const basketUpdatedSchema = z.object({
  type: z.literal(`${INTEGRATION_NAME}:basketUpdated`).optional(),
  id: z.string(),
})

export type basketUpdated = z.infer<typeof basketUpdatedSchema>