import parse from 'html-react-parser'
import Head from 'next/head'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import {LayoutProps} from '~/lib/types'

export default function Layout({settings, menu, seo, children}: LayoutProps) {
  return (
    <div className="container prose prose-stone m-auto my-8 space-y-16 dark:prose-invert lg:prose-xl">
      <Head>
        <title>{seo?.title ? parse(seo?.title) : `Next.js WordPress`}</title>
        {seo?.metaDesc ? parse(seo?.metaDesc) : null}
        {seo?.fullHead ? parse(seo?.fullHead) : null}
      </Head>
      <Header settings={settings} menu={menu} />
      <main>{children}</main>
      <Footer {...settings} />
    </div>
  )
}
