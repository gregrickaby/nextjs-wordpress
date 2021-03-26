import {ApolloClient, InMemoryCache} from '@apollo/client'

// Set WordPress connection defaults.
export const wpUrl = process.env.WORDPRESS_URL
export const wpUser = process.env.WORDPRESS_APPLICATION_USERNAME
export const wpPass = process.env.WORDPRESS_APPLICATION_PASSWORD

// Encode WordPress application username and password.
export const wpAuth = Buffer.from(`${wpUser}:${wpPass}`).toString('base64')

// Instantiate ApolloClient.
export const client = new ApolloClient({
  uri: `${wpUrl}/graphql`,
  cache: new InMemoryCache(),
  headers: {
    authorization: wpAuth ? `Basic ${wpAuth}` : ''
  }
})
