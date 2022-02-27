import Head from 'next/head'
import Footer from './Footer'
import Header from './Header'

export default function Layout({children}) {
  return (
    <div className="container m-auto my-8 space-y-8">
      <Head>
        <title>Site Title</title>
        <meta name="description" content="Description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
