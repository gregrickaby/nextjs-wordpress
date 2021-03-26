import {client} from '@/lib/wordpress/connector'
import styles from '@/styles/Home.module.css'
import {gql} from '@apollo/client'
import Head from 'next/head'
import Image from 'next/image'

/**
 * Display single book.
 *
 * @author Greg Rickaby
 *
 * @param {object} props The component data as props.
 * @param {object} book  The book data.
 * @return {Element}     The book component.
 */
export default function Book({book}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{book?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{book?.title}</h1>
        <Image
          alt={book?.featuredImage?.node?.altText}
          src={book?.featuredImage?.node?.sourceUrl}
          height={book?.featuredImage?.node?.mediaDetails?.height}
          width={book?.featuredImage?.node?.mediaDetails?.width}
        />
        <span>{book?.bookFields?.author}</span>
        <span>{book?.bookFields?.releaseDate}</span>
        <a href={book?.bookFields?.url}>Buy now</a>
        <h2>{book?.bookFields?.excerpt}</h2>
        <div
          dangerouslySetInnerHTML={{__html: book?.bookFields?.description}}
        />
      </main>
    </div>
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
        title(format: RAW)
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
        bookFields {
          author
          description
          excerpt
          releaseDate
          url
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
      book: data?.book
    },
    revalidate: 300
  }
}
