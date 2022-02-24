import {gql} from '@apollo/client'
import Head from 'next/head'
import MenuPrimary from '~/components/Menu'
import {client} from '~/lib/wordpressClient'

/**
 * Any WordPress Page.
 *
 * @author Greg Rickaby
 *
 * @param {object} props The component data as props.
 * @param {object} page  The page data.
 * @return {Element}     The page component.
 */
export default function Page({page}) {
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

export async function getStaticPaths() {
  const GET_ALL_PAGES = gql`
    query AllPagesQuery {
      pages {
        nodes {
          slug
        }
      }
    }
  `

  const {data} = await client.query({
    query: GET_ALL_PAGES
  })

  const paths = data?.pages?.nodes?.map((page) => ({
    params: {slug: page.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const GET_PAGE_BY_SLUG = gql`
    query PageQuery($slug: ID!) {
      page(id: $slug, idType: URI) {
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
    query: GET_PAGE_BY_SLUG,
    variables: {slug: params.slug}
  })

  return {
    props: {
      page: data?.page
    },
    revalidate: 300
  }
}
