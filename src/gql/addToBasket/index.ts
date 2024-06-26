import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

export type CheckoutLineInput = Array<{
  quantity: number
  variantId: string
  price?: number
  metadata?: any
  forceNewLine?: string
}>

export default async function addToBasket (checkoutId: string, lines: CheckoutLineInput, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { checkoutId, lines }, {
    authorization: `Bearer ${token}`
  })
}
