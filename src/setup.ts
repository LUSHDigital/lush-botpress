import { createOrGetWebhook, removeWebhook } from './misc/ops'
import { RegisterFunction, UnregisterFunction } from './misc/types'

export const register: RegisterFunction = async ({ ctx, logger, webhookUrl }) => {
  const { token, wyvernURL } = ctx.configuration

  await createOrGetWebhook(webhookUrl, token, wyvernURL)

  logger.forBot().info('Webook successfully created in Saleor')
}

export const unregister: UnregisterFunction = async ({ ctx, logger, webhookUrl }) => {
  console.log('unregister webhookUrl', webhookUrl)
  const { token, wyvernURL } = ctx.configuration
  console.log('unregister token', token)

  await removeWebhook(webhookUrl, token, wyvernURL)

  logger.forBot().info('Webook successfully removed from Saleor')
}
