import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

type CheckoutAttachArgs = {
  checkoutId: String
  customerId: String
}

export default async function attachCheckout (input: CheckoutAttachArgs, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, input, {
    authorization: `Bearer ${token}`
  })
}
