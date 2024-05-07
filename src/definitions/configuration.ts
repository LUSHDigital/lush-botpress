import { z } from '@botpress/sdk'

export const configuration = {
  schema: z.object({
    token: z.string(),
    wyvernURL: z.string(),
    saleorDomain: z.string()
  })
}