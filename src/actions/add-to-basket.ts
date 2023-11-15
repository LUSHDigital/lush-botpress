import { gql, request } from 'graphql-request'
import type { Implementation } from '../misc/types'
// import { getTag } from '../misc/utils'
// import addToBasketRequest from '../gql/addToBasket'

const query = gql`
query getCustomerOrders($userId: String) {
  user(externalReference: $userId) {
    checkouts(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
}
`

export const addToBasket: Implementation['actions']['addToBasket'] = async ({ input, logger, ctx }) => {
  // TODO Call Saleor
  logger.forBot().debug('input', input)

  const { userId } = input

  const saleorData = await request<Response>(ctx.configuration.wyvernURL, query, { userId }, {
    authorization: `Bearer ${ctx.configuration.token}`
  })

  // Remember to convert input.quantity to a number.

  logger.forBot().debug('saleorData', saleorData)

  // addToBasketRequest()

  return {}
}
