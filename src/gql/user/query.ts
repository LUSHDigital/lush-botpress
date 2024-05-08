import { gql } from 'graphql-request'

export default gql`
query getCustomerCheckout($externalReference: String) {
  user(externalReference: $externalReference) {
    id
    email
    checkouts(first: 1) {
      edges {
        node {
          id
        }
      }
    }
  }
}`
