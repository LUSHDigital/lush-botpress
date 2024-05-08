import { gql } from 'graphql-request'

export default gql`
mutation CheckoutCreate($input: CheckoutCreateInput!) {
  checkoutCreate(input: $input) {
    errors {
      message
      field
      code
    }
    checkout {
      id
    }
  }
}`
