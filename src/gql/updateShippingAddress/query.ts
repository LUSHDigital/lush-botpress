import { gql } from "graphql-request";

export default gql`
mutation updateShippingAddress($checkoutId: ID, $shippingAddress: AddressInput!) {
  checkoutShippingAddressUpdate(
    input: {
      checkoutId: $checkoutId,
      shippingAddress: $shippingAddress
    }
  ) {
    checkout {
      id
      shippingAddress {
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