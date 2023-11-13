import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

type CheckoutLineUpdateInput = Array<{
  lineId: number
  variantId: string
  quantity: number
  price?: number
}>

export default async function updateQuantity (checkoutId: string, lines: CheckoutLineUpdateInput, token: string, wyvernURL: string) {
  return await request<Response>(wyvernURL, query, { checkoutId, lines }, {
    authorization: `Bearer ${token}`
  })
}
