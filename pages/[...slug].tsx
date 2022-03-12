import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {GET_ALL_PAGES, SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Page({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.page?.seo}
    >
      <Article content={data?.page} />
    </Layout>
  )
}

export async function getStaticPaths() {
  const {data} = await client.query({
    query: GET_ALL_PAGES
  })

  const paths = data.pages.nodes.map((page) => {
    return {
      params: {
        slug: [page.slug]
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {data} = await client.query({
    query: SINGLE_PAGE_QUERY,
    variables: {slug: params.slug.toString()}
  })

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
