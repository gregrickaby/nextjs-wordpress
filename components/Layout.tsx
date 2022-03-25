import parse from 'html-react-parser'
import Head from 'next/head'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import {LayoutProps} from '~/lib/types'

export default function Layout({settings, menu, seo, children}: LayoutProps) {
  return (
    <div className="container m-auto my-8 space-y-8">
      <Head>{seo?.fullHead ? parse(seo?.fullHead) : null}</Head>
      <Header settings={settings} menu={menu} />
      <main>{children}</main>
      <Footer {...settings} />
    </div>
  )
}
