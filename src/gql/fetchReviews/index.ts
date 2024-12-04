import { request } from 'graphql-request'
import query from './query'

interface FetchReviewsInput {
  language: string;
  channel: string;
  client: string;
  contentTypes: string[];
  perPage: number;
  query: string;
}

interface Response {
  searchQuery: {
    items: {
      content: {
        reviews: []
      }
    }[]
  }
  errors: Array<{
    message: string
    code: string
  }>
}

export default async function fetchReviews(variables: FetchReviewsInput, token: string, wyvernURL: string): Promise<Response> {
  return await request<Response>(wyvernURL, query, variables, {
    authorization: `Bearer ${token}`
  })
}
