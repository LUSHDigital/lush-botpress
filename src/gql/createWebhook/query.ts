import { gql } from 'graphql-request'

export default gql`mutation WebhookCreate($input: WebhookCreateInput!) {
  webhookCreate(input: $input) {
    webhook {
      id
      name
      isActive
      targetUrl
    }
  }
}`
