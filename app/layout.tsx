import '@/app/globals.css'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Next.js WordPress',
  description: "It's headless WordPress"
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
