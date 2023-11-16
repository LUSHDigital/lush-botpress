import { gql, request } from 'graphql-request'
import type { Implementation } from '../misc/types'
// import { getTag } from '../misc/utils'
import addToBasketRequest from '../gql/addToBasket'

const query = gql`
query getCustomerCheckout($userId: String) {
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

  const { userId, variantId, quantity } = input

  if (userId === undefined) {
    logger.forBot().info('User ID is missing from input')
    return {}
  }

  const saleorData = await request<Response>(ctx.configuration.wyvernURL, query, { userId }, {
    authorization: `Bearer ${ctx.configuration.token}`
  }).catch((error) => {
    logger.forBot().error('saleorData error', error)
  })

  const checkoutId = saleorData.user.checkouts.edges[0]?.node.id ?? ''
  const lines = [{ quantity: Number(quantity), variantId }]
  logger.forBot().debug('saleorData', checkoutId, JSON.stringify(lines))

  const boop = await addToBasketRequest(checkoutId, lines, ctx.configuration.token, ctx.configuration.wyvernURL).catch((error) => {
    logger.forBot().error('saleorData error', error)
  })

  // {
  //   checkoutLinesAdd: {
  //     checkout: {
  //       lines: [{
  //         id: 'Q2hlY2tvdXRMaW5lOmI2YTUyOTY0LWU0OWQtNDYzZi1hNjc5LTllZjU4MThjNTQzMA==',
  //         variant: {
  //           name: '10 / 65 / 65g / CITES: No / Weighted: No'
  //         },
  //         quantity: 1
  //       },
  //       {
  //         id: 'Q2hlY2tvdXRMaW5lOmZiYzVmZTM1LTYzOWMtNGFhNy05ODgyLTcwMjk3NTA3ZWEwOA==',
  //         variant: {
  //           name: '1 / 500g'
  //         },
  //         quantity: 5
  //       }],
  //       totalPrice: {
  //         gross: {
  //           currency: 'GBP',
  //           amount: 86.5
  //         }
  //       }
  //     }
  //   }
  // }

  logger.forBot().debug('boop', JSON.stringify(boop))

  return {}
}
