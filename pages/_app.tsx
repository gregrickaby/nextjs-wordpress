import {ApolloProvider} from '@apollo/client'
import type {AppProps} from 'next/app'
import WordPressProvider from '~/components/WordPressProvider'
import {client} from '~/lib/wordpressClient'
import '~/styles/globals.css'

export default function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <WordPressProvider>
        <Component {...pageProps} />
      </WordPressProvider>
    </ApolloProvider>
  )
}
