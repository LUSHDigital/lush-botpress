import { IntegrationDefinitionProps } from '@botpress/sdk'
import { messages } from './messages';

export const channels = {
  basket: {
    messages: {
      text: messages.text,
    },
    message: {
      tags: {
        id: {},
      },
    },
    conversation: {
      tags: {
        id: {},
      },
    },
  },
  channel: {
    messages: {
      text: messages.text,
    },
    message: {
      tags: {
        id: {},
      },
    },
    conversation: {
      tags: {
        id: {},
        number: {},
      },
    },
  },
} satisfies IntegrationDefinitionProps['channels']