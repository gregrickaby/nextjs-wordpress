import {ApolloProvider} from '@apollo/client'
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core'
import {useColorScheme, useHotkeys, useLocalStorage} from '@mantine/hooks'
import {NotificationsProvider} from '@mantine/notifications'
import type {AppProps} from 'next/app'
import {useState} from 'react'
import WordPressProvider from '~/components/WordPressProvider'
import {client} from '~/lib/helpers'
import {PageProps} from '~/lib/types'

/**
 * Custom App component.
 *
 * @see https://nextjs.org/docs/advanced-features/custom-app
 * @see https://mantine.dev/guides/next/
 * @see https://www.apollographql.com/docs/react/api/react/hooks/#the-apolloprovider-component
 */
export default function App({Component, pageProps}: AppProps) {
  const {data} = pageProps as PageProps
  const [headerMenu] = useState(data?.headerMenu)
  const [footerMenu] = useState(data?.footerMenu)
  const [generalSettings] = useState(data?.generalSettings)
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
      <MantineProvider
        theme={{
          colorScheme,
          fontSizes: {
            xs: 10,
            sm: 16,
            md: 18,
            lg: 22,
            xl: 28
          },
          headings: {
            sizes: {
              h1: {fontSize: 48, lineHeight: 1.4}
            }
          }
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider autoClose={5000} limit={2}>
          <ApolloProvider client={client}>
            <WordPressProvider
              headerMenu={headerMenu}
              footerMenu={footerMenu}
              generalSettings={generalSettings}
            >
              <Component {...pageProps} />
            </WordPressProvider>
          </ApolloProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
