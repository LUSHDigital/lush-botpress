import type { Implementation } from '../misc/types'
import addToBasketRequest from '../gql/addToBasket'
import userRequest from 'src/gql/user'

export const addToBasket: Implementation['actions']['addToBasket'] = async ({ input, logger, ctx }) => {
  try {
    logger.forBot().debug('addToBasket[input]', input)

    const { userId, variantId, quantity } = input
    const { wyvernURL, token } = ctx.configuration

    if (!userId) {
      logger.forBot().info('User ID is missing from input')
      return {}
    }

    const userData = await userRequest(userId, token, wyvernURL)

    if (!userData.user) {
      logger.forBot().debug('userData userId', userId)
      logger.forBot().debug('userData error', wyvernURL, token)
      logger.forBot().debug('userData error', JSON.stringify(userData))
      throw new Error('Cannot find user in Saleor')
    }

    logger.forBot().debug('userData', JSON.stringify(userData))
    const checkoutId = userData.user.checkouts.edges[0]?.node.id ?? ''
    const lines = [{ quantity: Number(quantity), variantId }]
    logger.forBot().debug('checkout data', {checkoutId}, JSON.stringify(lines))

    const addToBasketResponse = await addToBasketRequest(checkoutId, lines, token, wyvernURL).catch((error) => {
      logger.forBot().error('addToBasketResponse error', error)
    })
    logger.forBot().debug('addToBasketResponse', JSON.stringify(addToBasketResponse))

    return {}
  } catch (error) {
    logger.forBot().error('general uncaught error', error)
    return {}
  }
}
