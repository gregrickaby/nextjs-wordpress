import {GetStaticPaths, GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {GET_ALL_BOOKS, SINGLE_BOOK_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Book({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.book?.seo}
    >
      <Article content={data?.page} />
      <p>ISBN: {data?.page?.bookFields?.isbn}</p>
      <a href={data?.page?.bookFields?.affiliateUrl} rel="external nofollow">
        Purchase Book
      </a>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await client.query({
    query: GET_ALL_BOOKS
  })

  const paths = data.books.nodes.map((book) => ({
    params: {slug: book.slug}
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // Query the book data.
  let {data} = await client.query({
    query: SINGLE_BOOK_QUERY,
    variables: {slug: params.slug}
  })

  // Set data shape.
  data = {
    generalSettings: data.generalSettings,
    menu: data.menu,
    page: data.book
  }

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
