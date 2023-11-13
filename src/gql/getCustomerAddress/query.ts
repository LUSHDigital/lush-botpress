import { gql } from 'graphql-request'

export default gql`
query getCustomerAddress($id: ID) {
  user(id: $id) {
    addresses(first: 1, sortBy: CREATED_AT_DESC) {
      edges {
        node {
          id
          firstName
          lastName
          addressLine1
          addressLine2
          city
          country {
            code
            country
          }
          postalCode
          phone
        }
      }
    }
  }
}`
