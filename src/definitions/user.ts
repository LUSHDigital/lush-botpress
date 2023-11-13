import type { IntegrationDefinitionProps } from '@botpress/sdk'

export const user = {
  tags: { id: {} },
  creation: { enabled: true, requiredTags: ['id'] }
} satisfies IntegrationDefinitionProps['user']
