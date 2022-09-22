import {GetStaticPaths, GetStaticProps} from 'next'
import Article from '~/components/Article'
import Card from '~/components/Card'
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
          <div className="grid gap-8 md:grid-cols-2">
            {data?.page?.nodes?.map((node: ContentFields, index: number) => (
              <Card key={index} content={node} />
            ))}
          </div>
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

interface QueryProps {
  query: any
  variables: {
    slug?: string
    category?: string
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  // Get the page slug.
  const slug = params.slug.toString()

  // Set default query.
  let graphQuery = {
    query: SINGLE_PAGE_QUERY,
    variables: {slug: slug}
  } as QueryProps

  // If Blog archive...
  if (slug === 'blog') {
    graphQuery = {
      query: POSTS_ARCHIVE_QUERY,
      variables: {category: 'uncategorized'}
    }
  }

  // If Books archive...
  if (slug === 'books') {
    graphQuery = {
      query: BOOKS_ARCHIVE_QUERY,
      variables: {slug: slug}
    }
  }

  // Query the page data.
  let {data} = await client.query(graphQuery)

  // If the page doesn't exist, bail and return 404.
  if (data.books === null || data.page === null || data.posts === null) {
    return {
      props: {
        data
      },
      notFound: true
    }
  }

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
