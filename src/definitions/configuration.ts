import type { IntegrationDefinitionProps } from '@botpress/sdk'
import { z } from 'zod'

export const configuration = {
  schema: z.object({
    token: z.string(),
    wyvernURL: z.string(),
    saleorDomain: z.string(),
  }),
} satisfies IntegrationDefinitionProps['configuration']
