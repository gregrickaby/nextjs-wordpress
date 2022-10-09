import parse from 'html-react-parser'
import Head from 'next/head'
import Footer from '~/components/Footer'
import Header from '~/components/Header'

export interface LayoutProps {
  children: any
  seo: {
    fullHead: string
    title: string
    metaDesc: string
  }
}

/**
 * Layout component.
 */
export default function Layout({seo, children}: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{seo?.title ? parse(seo?.title) : `Next.js WordPress`}</title>
        {seo?.metaDesc ? parse(seo?.metaDesc) : null}
        {seo?.fullHead ? parse(seo?.fullHead) : null}
        <link
          rel="preconnect"
          href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`}
        />
        <link
          rel="dns-prefetch"
          href={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}`}
        />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
