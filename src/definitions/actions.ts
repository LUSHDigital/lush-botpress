import type { IntegrationDefinitionProps } from '@botpress/sdk'

import { z } from 'zod'

const addToBasket = {
  title: 'Add to basket',
  description: 'Add one or more items to a basket',
  input: {
    schema: z.object({
      name: z.string().describe('The name of the product to add'),
      variantId: z.string().describe('The ID of the product variant, ex: UHJvZHVjdFZhcmlhbnQ6NDMxNA=='),
      quantity: z.number().min(1).default(1).describe('How many to add, ex: 1'),
    }),
    ui: {},
  },
  output: {
    schema: z.object({}),
  },
}

export const actions = {
  addToBasket,
} satisfies IntegrationDefinitionProps['actions']