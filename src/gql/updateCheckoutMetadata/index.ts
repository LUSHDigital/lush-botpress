import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function updateCheckoutMetadata (checkoutId: string, metadata: Record<string, any>, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { checkoutId, metadata }, {
    authorization: `Bearer ${token}`
  })
}
