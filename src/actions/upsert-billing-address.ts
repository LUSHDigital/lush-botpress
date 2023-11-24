import { gql, request } from 'graphql-request'
import type { Implementation } from '../misc/types'
import updateBillingAddressRequest from 'src/gql/updateBillingAddress'

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

export const upsertBillingAddress: Implementation['actions']['upsertBillingAddress'] = async ({ input, logger, ctx }) => {
  try {
    logger.forBot().debug('input', input)

    const { city, country, street, number, zip, userId } = input
    const { wyvernURL, token } = ctx.configuration

    if (userId === undefined) {
      logger.forBot().info('User ID is missing from input')
      return {}
    }

    const userData = await request<Response>(wyvernURL, query, { userId }, {
      authorization: `Bearer ${token}`
    }).catch((error) => {
      logger.forBot().error('userData error', error)
    })

    if (userData.user === null) {
      logger.forBot().debug('userData error', wyvernURL, token)
      logger.forBot().debug('userData error', JSON.stringify(userData))
      throw new Error('Cannot find user in Saleor')
    }

    logger.forBot().debug('userData', JSON.stringify(userData))
    const checkoutId = userData.user.checkouts.edges[0]?.node.id ?? ''
    const address = {
      firstName: 'Test',
      lastName: 'Test',
      streetAddress1: number ?? '',
      streetAddress2: street ?? '',
      city: city ?? '',
      postalCode: zip ?? '',
      country: 'GB'
    }
    logger.forBot().debug('billing address', checkoutId, address)

    const boop = await updateBillingAddressRequest(checkoutId, address, ctx.configuration.token, ctx.configuration.wyvernURL).catch((error) => {
      logger.forBot().error('boop error', error)
    })

    logger.forBot().debug('updateBillingAddressResponse', JSON.stringify(boop))

    return {}
  } catch (error) {
    logger.forBot().error('general uncaught error', error)
    return {}
  }
}
