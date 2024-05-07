import { gql, request } from 'graphql-request'
import type { Implementation } from '../misc/types'
// import { getTag } from '../misc/utils'
import updateShippingAddressRequest from '../gql/updateShippingAddress'

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

const doc = gql`
mutation updateShippingAddress($shippingAddress: AddressInput!, $validationRules: CheckoutAddressValidationRules, $checkoutShippingAddressUpdateId: ID) {
  checkoutShippingAddressUpdate(shippingAddress: $shippingAddress, validationRules: $validationRules, id: $checkoutShippingAddressUpdateId) {
    checkout {
      id
    }
    errors {
      code
      field
      message
    }
  }
}`

export const upsertShippingAddress: Implementation['actions']['upsertShippingAddress'] = async ({ input, logger, ctx }) => {
  try {
    logger.forBot().debug('upsertShippingAddress[input]', input)

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
      logger.forBot().debug('userData userId', userId)
      logger.forBot().debug('userData error', wyvernURL, token)
      logger.forBot().debug('userData error', JSON.stringify(userData))
      throw new Error('Cannot find user in Saleor')
    }

    logger.forBot().debug('userData', JSON.stringify(userData))
    const checkoutId = userData.user.checkouts.edges[0]?.node.id ?? ''

    // TODO Missing real first and last names.
    const address = {
      firstName: 'Test',
      lastName: 'Test',
      streetAddress1: number ?? '',
      streetAddress2: street ?? '',
      city: city ?? '',
      postalCode: zip ?? '',
      country: 'GB'
    }
    logger.forBot().debug('addressData', checkoutId, address)

    const boop = await updateShippingAddressRequest(checkoutId, address, ctx.configuration.token, ctx.configuration.wyvernURL).catch((error) => {
      logger.forBot().error('updateShippingAddressRequest error', error)
    })

    logger.forBot().debug('updateShippingAddressResponse', JSON.stringify(boop))

    return {}
  } catch (error) {
    logger.forBot().error('general uncaught error', error)
    return {}
  }
}
