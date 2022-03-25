import {GetStaticPaths, GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {
  BOOKS_ARCHIVE_QUERY,
  GET_ALL_PAGES,
  POSTS_ARCHIVE_QUERY,
  SINGLE_PAGE_QUERY
} from '~/lib/queries'
import {ContentFields, PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Page({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.page?.seo}
    >
      {
        // If this is an archive page...
        data?.page?.nodes?.length > 0 ? (
          // Loop over and display cards.
          data?.page?.nodes?.map((node: ContentFields, index: number) => (
            <Article key={index} content={node} />
          ))
        ) : (
          <Article content={data?.page} />
        )
      }
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await client.query({
    query: GET_ALL_PAGES
  })

  const paths = data.pages.nodes.map((page: {slug: string}) => {
    return {
      params: {
        slug: [page.slug]
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // Get the page slug.
  const slug = params.slug.toString()

  // Set default query.
  let query = SINGLE_PAGE_QUERY

  // If Blog archive...
  if (slug === 'blog') {
    query = POSTS_ARCHIVE_QUERY
  }

  // If Books archive...
  if (slug === 'books') {
    query = BOOKS_ARCHIVE_QUERY
  }

  // Query the page data.
  let {data} = await client.query({
    query,
    variables: {slug}
  })

  // Set data shape.
  data = {
    generalSettings: data.generalSettings,
    menu: data.menu,
    page: data.books || data.page || data.posts
  }

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
