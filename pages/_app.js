import {client} from '@/lib/wordpress/client'
import '@/styles/globals.css'
import {ApolloProvider} from '@apollo/client'

function MyApp({Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
