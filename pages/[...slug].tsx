import {GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '~/components/Layout'
import {GET_ALL_PAGES, SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Page({page}: PageProps) {
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
      page: data.page
    },
    revalidate: 300
  }
}
