import Footer from '@/components/Footer'
import Header from '@/components/Header'
import config from '@/lib/config'
import type {Metadata, Viewport} from 'next'
import './globals.css'

/**
 * Setup metadata.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: `${config.siteName} - ${config.siteDescription}`,
  description: config.siteDescription
}

/**
 * Setup viewport.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport
 */
export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#18181b'
}

/**
 * Root layout component.
 *
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
 */
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
