import { request } from 'graphql-request'
import query from './query'

interface Webhook {
  webhook: {
    id: string
    isActive: boolean
    name: string
    targetUrl: string
  }
}

interface WebhookCreateInput {
  input: {
    asyncEvents: ['ANY_EVENTS']
    isActive: true
    name: string
    targetUrl: string
  }
}

export default async function createWebhook (wyvernURL: string, variables: WebhookCreateInput, token: string): Promise<Webhook> {
  return await request<Webhook>(wyvernURL, query, variables, {
    authorization: `Bearer ${token}`
  })
}
