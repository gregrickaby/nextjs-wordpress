import MenuPrimary from '@/components/Menus/Primary'
import {client} from '@/lib/wordpress/client'
import {gql} from '@apollo/client'
import Head from 'next/head'

/**
 * The homepage.
 *
 * @author Greg Rickaby
 * @param {object} props The component data as props.
 * @param {object} page  The homepage data.
 * @return {Element}     The homepage component.
 */
export default function Homepage({page}) {
  return (
    <>
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuPrimary />
      <main>
        <h1>{page?.title}</h1>
        <div dangerouslySetInnerHTML={{__html: page?.content}} />
      </main>
    </>
  )
}

export async function getStaticProps() {
  const GET_HOMEPAGE = gql`
    query HomePageQuery {
      page(id: "/", idType: URI) {
        title(format: RENDERED)
        featuredImage {
          node {
            altText
            sourceUrl(size: LARGE)
            mediaDetails {
              height
              width
            }
          }
        }
        content(format: RENDERED)
      }
    }
  `

  const {data} = await client.query({
    query: GET_HOMEPAGE
  })

  return {
    props: {
      page: data?.page
    }
  }
}
