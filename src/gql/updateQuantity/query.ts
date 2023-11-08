import { gql } from "graphql-request";

export default gql`
mutation updateQuantity($id: ID, $lines: [CheckoutLineUpdateInput!]!) {
  checkoutLinesUpdate(
    id: $id,
    lines: $lines
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