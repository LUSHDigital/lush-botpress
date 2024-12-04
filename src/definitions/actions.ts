import { z } from '@botpress/sdk'

const addToBasket = {
  title: 'Add to basket',
  description: 'Add one or more items to a basket',
  input: {
    schema: z.object({
      userId: z.string().describe('The Auth0 ID of the user, ex: auth0|324234dfgfdg'),
      variantId: z.string().describe('The ID of the product variant, ex: UHJvZHVjdFZhcmlhbnQ6NDMxNA=='),
      quantity: z.string().describe('How many to add, ex: 1')
    }),
    ui: {
      userId: {
        title: 'User ID',
        examples: ['auth0|32434dfsfds']
      },
      variantId: {
        title: 'Saleor Variant ID',
        examples: ['UHJvZHVjdFZhcmlhbnQ6MjY=']
      },
      quantity: {
        title: 'Product quantity'
      }
    }
  },
  output: {
    schema: z.object({})
  }
}

const removeFromBasket = {
  title: 'Remove product from basket',
  description: 'Remove a variant from the basket',
  input: {
    schema: z.object({
      variantId: z.string().describe('The variant ID in Saleor')
    }),
    ui: {}
  },
  output: {
    schema: z.object({})
  }
}

const updateQuantity = {
  title: 'Update quantity',
  description: 'Update a variant\'s quantity the basket',
  input: {
    schema: z.object({
      variantId: z.string().describe('The variant ID in Saleor'),
      quantity: z.number().describe('The desired quantity')
    }),
    ui: {}
  },
  output: {
    schema: z.object({})
  }
}

const getCustomerOrders = {
  title: 'Get Customer Orders',
  description: 'Fetch recent customer orders',
  input: {
    schema: z.object({
      userId: z.string().describe('The Auth0 ID of the customer')
    }),
    ui: {}
  },
  output: {
    schema: z.object({})
  }
}

const upsertShippingAddress = {
  title: 'Upsert shipping address',
  description: 'Update or create new shipping address',
  input: {
    schema: z.object({
      userId: z.string().describe('The Auth0 ID of the user, ex: auth0|324234dfgfdg'),
      city: z.string().optional(),
      country: z.string().optional(),
      number: z.string().optional(),
      street: z.string().optional(),
      zip: z.string().optional()
    }),
    ui: {}
  },
  output: {
    schema: z.object({})
  }
}

const upsertBillingAddress = {
  title: 'Upsert billing address',
  description: 'Update or create new billing address',
  input: {
    schema: z.object({
      userId: z.string().describe('The Auth0 ID of the user, ex: auth0|324234dfgfdg'),
      city: z.string().optional(),
      country: z.string().optional(),
      number: z.string().optional(),
      street: z.string().optional(),
      zip: z.string().optional()
    }),
    ui: {}
  },
  output: {
    schema: z.object({})
  }
}

const addUserToCheckout = {
  title: 'Associate a conversation with a checkout',
  description: 'Creates a link between this conversation and a Saleor checkout',
  input: {
    schema: z.object({
      conversationId: z.string().describe('The Botpress conversation ID'),
      botpressUserid: z.string().describe('The Botpress ID of the person'),
      userId: z.string().describe('The Auth0 User ID of the person')
    }),
    ui: {
      conversationId: {
        title: 'Conversation ID',
        examples: ['event.conversationId']
      },
      botpressUserid: {
        title: 'Botpress User ID',
        examples: ['event.userId']
      },
      userId: {
        title: 'Lush User ID',
        examples: ['auth0|324234dfgfdg']
      }
    }
  },
  output: {
    schema: z.object({})
  }
}

const fetchReviews = {
  title: 'Fetch reviews',
  description: 'Fetch reviews for a specific product',
  input: {
    schema: z.object({
      commerce_id: z.string().describe('The commerce_id of the product from the ProductTable'),
      product_name: z.string().describe('The name of the product'),
      product_type: z.string().describe('The type of the product'),
    })
  },
  output: {
    schema: z.object({
      reviews: z.object({
        items: z.array(z.object({
          rating: z.object({
            overall: z.number(),
            quality: z.number().nullable(),
            value: z.number().nullable(),
          }),
          isRecommended: z.boolean(),
          language: z.string(),
          submissionDate: z.string(),
          text: z.string().nullable(),
          title: z.string().nullable(),
          wouldBuyAgain: z.boolean().nullable(),
          user: z.object({
            nickname: z.string(),
            location: z.string(),
          }),
          isRatingsOnly: z.boolean(),
          isFeatured: z.boolean(),
          feedback: z.object({
            total: z.number(),
            positive: z.number(),
            negative: z.number(),
          })
        })),
        rating: z.object({
          value: z.number().nullable(),
          quality: z.number().nullable(),
          overall: z.number().nullable(),
        }),
      }).optional()
    })
  }
}

export const actions = {
  addToBasket,
  addUserToCheckout,
  fetchReviews,
  getCustomerOrders,
  removeFromBasket,
  updateQuantity,
  upsertBillingAddress,
  upsertShippingAddress,
}