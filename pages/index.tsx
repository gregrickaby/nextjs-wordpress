import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Homepage({data}: PageProps) {
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

export const getStaticProps: GetStaticProps = async () => {
  const {data} = await client.query({
    query: SINGLE_PAGE_QUERY,
    variables: {slug: 'homepage'}
  })

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
