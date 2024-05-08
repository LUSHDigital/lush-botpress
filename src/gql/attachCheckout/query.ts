import { gql } from 'graphql-request'

export default gql`
mutation CheckoutCustomerAttach($customerId: ID, $checkoutId: ID) {
  checkoutCustomerAttach(customerId: $customerId, checkoutId: $checkoutId) {
    errors {
      code
      field
      message
    }
    checkout {
      id
    }
  }
}`
