import {GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '~/components/Layout'
import {GET_ALL_POSTS, SINGLE_POST_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Post({page}: PageProps) {
  return (
    <Layout>
      <Head>
        <title>{page?.title}</title>
      </Head>
      <article>
        <h1 className="mb-4 text-3xl">{page?.title}</h1>
        {!!page?.featuredImage && (
          <Image
            alt={page?.featuredImage?.node?.altText}
            src={page?.featuredImage?.node?.sourceUrl}
            height={page?.featuredImage?.node?.mediaDetails?.height}
            width={page?.featuredImage?.node?.mediaDetails?.width}
          />
        )}
        <div dangerouslySetInnerHTML={{__html: page?.content}} />
      </article>
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
      page: data.post
    },
    revalidate: 300
  }
}
