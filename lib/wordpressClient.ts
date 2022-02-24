import {ApolloClient, InMemoryCache} from '@apollo/client'

export const client = new ApolloClient({
  uri: `https://gregrickaby.test/graphql`,
  cache: new InMemoryCache()
})
