import { Implementation } from '../misc/types'
// import { getTag } from '../misc/utils'

export const addToBasket: Implementation['actions']['addToBasket'] = async ({ input, logger }) => {
	// TODO Call Saleor
	logger.forBot().debug("input", input);
	
  return {}
}