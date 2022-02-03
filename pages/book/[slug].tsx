import {client} from '@/lib/wordpress/client'
import MenuPrimary from '@/components/Menus/Primary'
import {gql} from '@apollo/client'
import Head from 'next/head'

/**
 * Display single book.
 *
 * @author Greg Rickaby
 *
 * @param {object} props The component data as props.
 * @param {object} [page]  The page data.
 * @return {Element}     The book component.
 */
export default function Book({page}) {
  return (
    <>
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuPrimary />
      <main>
        <h1>{page?.bookTitle}</h1>
        <div dangerouslySetInnerHTML={{__html: page?.description}} />
      </main>
    </>
  )
}

export async function getStaticPaths() {
  const GET_ALL_BOOKS = gql`
    query AllBooksQuery {
      books {
        nodes {
          slug
        }
      }
    }
  `

  const {data} = await client.query({
    query: GET_ALL_BOOKS
  })

  const paths = data?.books?.nodes?.map((book) => ({
    params: {slug: book.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const GET_BOOK_BY_SLUG = gql`
    query BookQuery($slug: ID!) {
      book(id: $slug, idType: URI) {
        affiliateLink
        bookTitle
        description
        featuredImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              height
              width
            }
          }
        }
      }
    }
  `

  const {data} = await client.query({
    query: GET_BOOK_BY_SLUG,
    variables: {slug: params.slug}
  })

  return {
    props: {
      page: data?.book
    },
    revalidate: 300
  }
}
