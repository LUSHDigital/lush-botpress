import { gql } from 'graphql-request'

export default gql`
query getCustomerOrders($userId: ID, $first: Int) {
  user(id: $userId) {
    orders(first: $first) {
      edges {
        node {
          id
          total {
            gross {
              amount
              currency
            }
            currency
          }
          lines {
            variantName
            variant {
              id
              name
              sku
            }
          }
        }
        cursor
      }
    }
  }
}
`;