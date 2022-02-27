import {ApolloProvider} from '@apollo/client'
import type {AppProps} from 'next/app'
import WordpressProvider from '~/components/WordpressProvider'
import {client} from '~/lib/wordpressClient'
import '~/styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <WordpressProvider>
        <Component {...pageProps} />
      </WordpressProvider>
    </ApolloProvider>
  )
}
