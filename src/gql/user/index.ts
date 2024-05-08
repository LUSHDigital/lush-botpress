import { request } from 'graphql-request'
import query from './query'

interface Response {
  user?: {
    id: string
    email: string
    checkouts: {
      edges: {
        node: {
          id: string
        }
      }[]
    }
  }
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function user (externalReference: String, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, { externalReference }, {
    authorization: `Bearer ${token}`
  })
}
