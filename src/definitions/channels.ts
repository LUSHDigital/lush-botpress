import { IntegrationDefinitionProps } from '@botpress/sdk'
import { messages } from './messages'

export const channels = {
  channel: {
    messages,
    message: {
      tags: {
        id: {}
      }
    },
    conversation: {
      tags: {
        id: {}
      }
    }
  }
} satisfies IntegrationDefinitionProps['channels']
