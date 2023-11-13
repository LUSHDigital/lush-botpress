import { request } from 'graphql-request'
import query from './query'

interface Response {
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function getCustomerOrders (userId: string, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { userId, first: 10 }, {
    authorization: `Bearer ${token}`
  })
}
