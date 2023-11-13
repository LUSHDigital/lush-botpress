import type { Conversation } from '@botpress/client'
import type { AckFunction } from '@botpress/sdk'
import { INTEGRATION_NAME } from '../const'
import type { Client } from '.botpress'

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
  client: Client
): Promise<UserConversation> => {
  const { userId, channelId, channel } = props
  console.log('getUserAndConversation', { userId, channelId, channel })
  const { conversation } = await client.getOrCreateConversation({
    channel: 'channel',
    tags: { number: channelId.toString() }
  })
  const { user } = await client.getOrCreateUser({ tags: { id: props.userId.toString() } })

  return {
    userId: user.id,
    conversationId: conversation.id
  }
}
