import { request } from 'graphql-request'
import query from './query'
import type { CheckoutLineInput } from '../addToBasket'

interface Response {
  checkoutCreate: {
    checkout?: {
      id: string
    }
    errors: Array<{
      message: string
      code: string
    }>
  }
}

export type CheckoutCreateInput = {
  channel: String
  email: String
  lines: CheckoutLineInput[]
}

export default async function createCheckout (input: CheckoutCreateInput, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { input }, {
    authorization: `Bearer ${token}`
  })
}
