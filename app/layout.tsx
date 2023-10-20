import type {Metadata} from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
