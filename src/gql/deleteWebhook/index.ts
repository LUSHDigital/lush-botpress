import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function deleteWebhook (webhookDeleteId: string, token: string, wyvernURL: string) {
  return await request<Response>(wyvernURL, query, { webhookDeleteId }, {
    authorization: `Bearer ${token}`
  })
}
