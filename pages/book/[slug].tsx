import {GetStaticPaths, GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '~/components/Layout'
import {GET_ALL_BOOKS, SINGLE_BOOK_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Book({page}: PageProps) {
  const {title, description} = page
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <article>
        <h1 className="mb-4 text-3xl">{title}</h1>
        {!!page?.featuredImage && (
          <Image
            alt={page?.featuredImage?.node?.altText}
            src={page?.featuredImage?.node?.sourceUrl}
            height={page?.featuredImage?.node?.mediaDetails?.height}
            width={page?.featuredImage?.node?.mediaDetails?.width}
          />
        )}
        <div dangerouslySetInnerHTML={{__html: description}} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await client.query({
    query: GET_ALL_BOOKS
  })

  const paths = data?.books?.nodes?.map((book) => ({
    params: {slug: book.slug}
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {data} = await client.query({
    query: SINGLE_BOOK_QUERY,
    variables: {slug: params.slug}
  })

  return {
    props: {
      page: data?.book
    },
    revalidate: 300
  }
}
