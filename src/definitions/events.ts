import { IntegrationDefinitionProps } from '@botpress/sdk'
import { basketUpdatedSchema } from '../schemas'

const basketUpdated = {
  schema: basketUpdatedSchema,
  ui: {},
}

export const events = {
  basketUpdated,
} satisfies IntegrationDefinitionProps['events']
