import type { Conversation } from '@botpress/client'
import type { AckFunction } from '@botpress/sdk'
import { INTEGRATION_NAME } from '../const'
import type { Client } from '.botpress'
import { IntegrationLogger } from '@botpress/sdk/dist/integration/logger'

export const getTag = (tags: Record<string, string>, name: string): string | undefined => {
  return tags[`${INTEGRATION_NAME}:${name}`]
}

export function getConversationId (conversation: Conversation): number {
  const id = getTag(conversation.tags, 'number')

  if (!id) {
    throw Error(`No chat found for conversation ${conversation.id}`)
  }

  return Number(id)
}

export async function ackMessage (messageId: number, ack: AckFunction): Promise<void> {
  await ack({ tags: { id: messageId.toString() } })
}

interface UserConversation {
  userId: string
  conversationId: string
}

export const getUserAndConversation = async (
  props: { userId: string | number, channelId: string | number, channel: string },
  client: Client,
  logger: IntegrationLogger
): Promise<UserConversation> => {
  const { userId, channelId, channel } = props
  logger.forBot().debug('getUserAndConversation', { userId, channelId, channel })
  const { conversation } = await client.getOrCreateConversation({
    channel: 'channel',
    tags: { number: channelId.toString() }
  })
  logger.forBot().debug('getUserAndConversation', { conversation })

  const { user } = await client.getOrCreateUser({ tags: { id: props.userId.toString() } })

  logger.forBot().debug('user', { user })
  return {
    userId: user.id,
    conversationId: conversation.id
  }
}

export function stripLastSlash (inputString: string): string {
  // Check if the last character is a forward slash
  if (inputString.endsWith('/')) {
    // If so, remove it and return the modified string
    return inputString.slice(0, -1)
  } else {
    // Otherwise, return the original string unchanged
    return inputString
  }
}
