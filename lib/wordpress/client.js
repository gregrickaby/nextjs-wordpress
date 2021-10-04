import {ApolloClient, InMemoryCache} from '@apollo/client'

// Instantiate ApolloClient.
export const client = new ApolloClient({
  uri: `${process.env.WORDPRESS_URL}graphql`,
  cache: new InMemoryCache()
})
