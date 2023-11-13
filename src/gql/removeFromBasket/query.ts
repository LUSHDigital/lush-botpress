import { gql } from 'graphql-request'

export default gql`
mutation removeFromBasket($checkoutId: ID, $lineId: ID) {
  checkoutLineDelete(
    id: $checkoutId,
    lineId: $lineId
  ) {
    checkout {
      lines {
        id
        variant {
          id
        }
        quantity
      }
    }
    errors {
      field
      message
    }
  }
}`
