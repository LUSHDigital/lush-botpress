import { gql } from 'graphql-request'

export default gql`
mutation WebhookDelete($webhookDeleteId: ID!) {
  webhookDelete(id: $webhookDeleteId) {
    errors {
      message
      code
    }
  }
}`
