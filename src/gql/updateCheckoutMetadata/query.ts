import { gql } from 'graphql-request'

export default gql`
  mutation AddMetadataToCheckout($checkoutId: ID!, $metadata: [MetadataInput!]!) {
    updateMetadata(
      id: $checkoutId
      input: $metadata
    ) {
      errors {
        code
        field
        message
      }
    }
  }
`
