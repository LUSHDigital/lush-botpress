import { gql } from 'graphql-request'

export default gql`query App {
  app {
    webhooks {
			isActive
			name
      id
      targetUrl
    }
  }
}`
