import type { Implementation } from '../misc/types'
import updateCheckoutMetadataRequest from '../gql/updateCheckoutMetadata'
import user from 'src/gql/user'
import createCheckoutRequest, { type CheckoutCreateInput } from 'src/gql/createCheckout'
import attachCheckoutRequest from 'src/gql/attachCheckout'

export const addUserToCheckout: Implementation['actions']['addUserToCheckout'] = async ({ input, logger, ctx }) => {
  try {
    logger.forBot().debug('addUserToCheckout[input]', input)

    const { userId, conversationId, botpressUserid } = input
    const { wyvernURL, token } = ctx.configuration

    if (!userId) {
      logger.forBot().info('User ID is missing from input')
      return {}
    }

    const userData = await user(userId, token, wyvernURL);

    if (!userData.user) {
      logger.forBot().debug('userData userId', userId)
      logger.forBot().debug('userData error', wyvernURL, token)
      logger.forBot().debug('userData error', JSON.stringify(userData))
      throw new Error('Cannot find user in Saleor')
    }

    logger.forBot().debug('userData', JSON.stringify(userData))
    let checkoutId = userData.user?.checkouts?.edges?.[0]?.node?.id

    if (!checkoutId) {
      // Create checkout in Saleor.
      const input: CheckoutCreateInput = {
        lines: [],
        channel: 'uk', // TODO replace this
        email: userData.user.email
      }
      const createCheckoutResponse = await createCheckoutRequest(input, token, wyvernURL).catch((error) => {
        logger.forBot().error('createCheckoutResponse error', error)
      })
      logger.forBot().debug('createCheckoutResponse', JSON.stringify(createCheckoutResponse))

      checkoutId = createCheckoutResponse?.checkoutCreate?.checkout?.id || ''

      // Attach to user.
      const payload = {
        checkoutId,
        customerId: userData.user.id
      }

      logger.forBot().debug('attachCheckoutResponse payload', payload)

      const attachCheckoutResponse = await attachCheckoutRequest(payload, token, wyvernURL).catch((error) => {
        logger.forBot().error('attachCheckoutResponse error', error)
      })
      logger.forBot().debug('attachCheckoutResponse', JSON.stringify(attachCheckoutResponse))
    }

    const metadata = [{
      key: 'botpressConversationId',
      value: conversationId
    }, {
      key: 'botpressUserId',
      value: botpressUserid
    }]

    logger.forBot().debug('userData', checkoutId, metadata)

    const updateCheckoutMetadataResponse = await updateCheckoutMetadataRequest(checkoutId, metadata, ctx.configuration.token, ctx.configuration.wyvernURL).catch((error) => {
      logger.forBot().error('updateCheckoutMetadataResponse error', error)
    })

    logger.forBot().debug('updateCheckoutMetadataResponse', JSON.stringify(updateCheckoutMetadataResponse))

    return {}
  } catch (error) {
    logger.forBot().error('addUserToCheckout general uncaught error', error)
    return {}
  }
}
