import {GetStaticPaths, GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {client} from '~/lib/helpers'
import {GET_ALL_BOOKS, SINGLE_BOOK_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'

/**
 * Single book component.
 *
 * This component is used to display single books.
 */
export default function SingleBook({data}: PageProps) {
  return (
    <Layout>
      <Article content={data.page} />
      <p>ISBN: {data?.page?.bookFields?.isbn}</p>
      <a href={data?.page?.bookFields?.affiliateUrl} rel="external nofollow">
        Purchase Book
      </a>
    </Layout>
  )
}

/**
 * Get all paths at build time.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-paths
 */
export const getStaticPaths: GetStaticPaths = async () => {
  // Don't pre-render any books at build time.
  if (process.env.DISABLE_STATIC_SITE_GENERATION === 'true') {
    return {
      paths: [],
      fallback: 'blocking'
    }
  }

  // Query all books for static site generation.
  const {data} = await client.query({
    query: GET_ALL_BOOKS
  })

  // Loop over all posts and create a path for each.
  const paths = data.books.nodes.map((book) => ({
    params: {slug: book.slug}
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

/**
 * Query data and pass it to the book component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async ({params}) => {
  // Get the post slug.
  const slug = params.slug.toString()

  // Query a single book by slug.
  let {data} = await client.query({
    query: SINGLE_BOOK_QUERY,
    variables: {slug: slug}
  })

  // Set data shape.
  data = {
    generalSettings: data.generalSettings,
    headerMenu: data.headerMenu,
    footerMenu: data.footerMenu,
    page: data.book
  }

  // Pass data to the page via props.
  return {
    props: {
      data
    },
    revalidate: 60
  }
}
