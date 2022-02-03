import {ApolloClient, InMemoryCache} from '@apollo/client'

// Instantiate ApolloClient.
export const client = new ApolloClient({
  uri: `https://gregrickaby.test/graphql`,
  cache: new InMemoryCache()
})
