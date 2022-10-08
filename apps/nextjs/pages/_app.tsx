import {ApolloProvider} from '@apollo/client'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core'
import {useColorScheme, useHotkeys, useLocalStorage} from '@mantine/hooks'
import type {AppProps} from 'next/app'
import {client} from '~/lib/helpers'

/**
 * Custom App component.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://mantine.dev/guides/next/
 * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
 */
export default function App({Component, pageProps}: AppProps) {
  const preferredColorScheme = useColorScheme()
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'nextjs-wp-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true
  })

  function toggleColorScheme(value?: ColorScheme) {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))
  }

  useHotkeys([['mod+j', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
