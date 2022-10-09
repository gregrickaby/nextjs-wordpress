import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Meta from '~/components/Meta'
import {ChildrenProps} from '~/lib/types'

/**
 * Layout component.
 */
export default function Layout({children}: ChildrenProps) {
  return (
    <div>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
