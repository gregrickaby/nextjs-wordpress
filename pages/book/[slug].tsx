import {gql} from '@apollo/client'
import Head from 'next/head'
import Layout from '~/components/Layout'
import {client} from '~/lib/wordpressClient'

export default function Book({page}) {
  return (
    <Layout>
      <Head>
        <title>{page?.title}</title>
      </Head>
      <article>
        <h1 className="mb-4 text-3xl">{page?.bookTitle}</h1>
        <div dangerouslySetInnerHTML={{__html: page?.description}} />
      </article>
    </Layout>
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
