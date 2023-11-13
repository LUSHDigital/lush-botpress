import { request } from 'graphql-request'
import query from './query'

interface App {
  app: {
    webhooks: Array<{
      id: string
      isActive: boolean
      name: string
      targetUrl: string
    }>
  }
}

export default async function app (token: string, wyvernURL: string) {
  return await request<App>(wyvernURL, query, undefined, {
    authorization: `Bearer ${token}`
  })
}
