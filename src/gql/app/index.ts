import { request } from 'graphql-request'
import query from './query'

export interface Webhook {
  id: string
  isActive: boolean
  name: string
  targetUrl: string
}

interface App {
  app: {
    webhooks: Webhook[]
  }
}

export default async function app (token: string, wyvernURL: string): Promise<App> {
  return await request<App>(wyvernURL, query, undefined, {
    authorization: `Bearer ${token}`
  })
}
