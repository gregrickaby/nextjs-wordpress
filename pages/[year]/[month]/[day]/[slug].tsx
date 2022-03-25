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
          comments={data?.post?.comments}
          postId={data?.post?.databaseId}
          total={data?.post?.commentCount}
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
        day: slug[2] || '',
        slug: slug[3] || ''
      }
    }
  })

  return {
    paths,
    fallback: 'blocking'
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
