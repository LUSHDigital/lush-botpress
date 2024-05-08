import { gql } from 'graphql-request'

export default gql`
mutation addToBasket($lines: [CheckoutLineInput!]!, $checkoutId: ID) {
  checkoutLinesAdd(
    id: $checkoutId
    lines: $lines
  ) {
    errors {
      field
      message
      code
    }
    checkout {
      lines {
        id
        variant {
          name
        }
        quantity
      }
      totalPrice {
        gross {
          currency
          amount
        }
      }
    }
  }
}`
