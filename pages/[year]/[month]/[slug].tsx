import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Comments from '~/components/Comments'
import Layout from '~/components/Layout'
import {GET_ALL_POSTS, SINGLE_POST_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Post({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.post?.seo}
    >
      <Article content={data?.post} />
      {data?.post?.commentStatus === 'open' && (
        <Comments
          total={data?.post?.commentCount}
          comments={data?.post?.comments}
        />
      )}
    </Layout>
  )
}

export async function getStaticPaths() {
  const {data} = await client.query({
    query: GET_ALL_POSTS
  })

  const paths = data.posts.nodes.map((post) => {
    const slug = post.uri.replace(/^\/|\/$/g, '').split('/')

    return {
      params: {
        year: slug[0] || '',
        month: slug[1] || '',
        slug: slug[2] || ''
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
    query: SINGLE_POST_QUERY,
    variables: {slug: params.slug}
  })

  return {
    props: {
      data
    },
    revalidate: 300
  }
}
