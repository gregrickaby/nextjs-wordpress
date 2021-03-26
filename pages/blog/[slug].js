import displayBlock from '@/lib/displayBlock'
import {client} from '@/lib/wordpress/client'
import styles from '@/styles/Home.module.css'
import {gql} from '@apollo/client'
import Head from 'next/head'

/**
 * Display single post.
 *
 * @author Greg Rickaby
 *
 * @param {object} props The component data as props.
 * @param {object} post  The post data.
 * @return {Element}     The post component.
 */
export default function Post({post}) {
  const blocks = JSON.parse(post?.blocksJSON)

  return (
    <div className={styles.container}>
      <Head>
        <title>{post?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{post?.title}</h1>
        {!!blocks?.length &&
          blocks.map((block, index) => {
            return displayBlock(block, index)
          })}
      </main>
    </div>
  )
}

export async function getStaticPaths() {
  const GET_ALL_POSTS = gql`
    query AllPostsQuery {
      posts {
        nodes {
          slug
        }
      }
    }
  `

  const {data} = await client.query({
    query: GET_ALL_POSTS
  })

  const paths = data?.posts?.nodes?.map((post) => ({
    params: {slug: post.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const GET_POST_BY_SLUG = gql`
    query PostQuery($slug: ID!) {
      post(id: $slug, idType: URI) {
        title(format: RAW)
        blocksJSON
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
      }
    }
  `

  const {data} = await client.query({
    query: GET_POST_BY_SLUG,
    variables: {slug: params.slug}
  })

  return {
    props: {
      post: data?.post
    },
    revalidate: 300
  }
}
