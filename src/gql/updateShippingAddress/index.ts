import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

interface AddressInput {
  firstName: string
  lastName: string
  streetAddress1: string
  streetAddress2: string
  city: string
  postalCode: string
  country: string
}

export default async function updateShippingAddress (checkoutId: string, shippingAddress: AddressInput, token: string, wyvernURL: string) {
  return await request<Response>(wyvernURL, query, { checkoutId, shippingAddress }, {
    authorization: `Bearer ${token}`
  })
}
