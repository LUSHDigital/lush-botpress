import { gql } from "graphql-request";

export default gql`
query getBasket($userId: ID) {
  user(id: $userId) {
    checkouts(last: 1) {
      edges {
        node {
          id
          totalPrice {
            gross {
              amount
              currency
            }
          }
          lines {
            id
            quantity
            totalPrice {
              currency
              gross {
                amount
              }
            }
            variant {
              id
              name
            }
          }
        }
      }
    }
  }
}`;