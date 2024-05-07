import { gql, request } from 'graphql-request'
import type { Implementation } from '../misc/types'
import updateCheckoutMetadataRequest from '../gql/updateCheckoutMetadata'

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

export const addUserToCheckout: Implementation['actions']['addUserToCheckout'] = async ({ input, logger, ctx }) => {
  try {
    logger.forBot().debug('addUserToCheckout[input]', input)

    const { userId, conversationId } = input
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
    const metadata = [{
      key: 'botpressConversationId',
      value: conversationId
    }, {
      key: 'botpressUserId',
      value: userId
    }]

    logger.forBot().debug('userData', checkoutId, metadata)

    const boop = await updateCheckoutMetadataRequest(checkoutId, metadata, ctx.configuration.token, ctx.configuration.wyvernURL).catch((error) => {
      logger.forBot().error('boop error', error)
    })

    logger.forBot().debug('boop', JSON.stringify(boop))

    return {}
  } catch (error) {
    logger.forBot().error('addUserToCheckout general uncaught error', error)
    return {}
  }
}
