import { gql } from "graphql-request";

export default gql`
mutation updateBillingAddress($checkoutId: ID, $billingAddress: AddressInput!) {
  checkoutBillingAddressUpdate(
    input: {
      checkoutId: $checkoutId,
      billingAddress: $billingAddress
    }
  ) {
    checkout {
      id
      billingAddress {
        firstName
        lastName
        streetAddress1
        streetAddress2
        city
        postalCode
        country
      }
    }
  }
}`