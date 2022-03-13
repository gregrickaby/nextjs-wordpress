import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {POSTS_ARCHIVE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Homepage({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.page?.seo}
    >
      {data?.posts?.nodes.map((post, index) => (
        <Article key={index} content={post} />
      ))}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const {data} = await client.query({
    query: POSTS_ARCHIVE_QUERY,
    variables: {slug: 'blog'}
  })

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
