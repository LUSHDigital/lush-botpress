import type { IntegrationDefinitionProps } from '@botpress/sdk'
import { z } from 'zod'

export const configuration = {
  schema: z.object({
    botToken: z.string(),
    token: z.string(),
  }),
} satisfies IntegrationDefinitionProps['configuration']
