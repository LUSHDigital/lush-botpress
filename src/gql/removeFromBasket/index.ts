import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function removeFromBasket (checkoutId: string, lineId: string, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { checkoutId, lineId }, {
    authorization: `Bearer ${token}`
  })
}
