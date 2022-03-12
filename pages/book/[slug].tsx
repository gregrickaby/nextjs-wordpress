import {GetStaticPaths, GetStaticProps} from 'next'
import Image from 'next/image'
import Layout from '~/components/Layout'
import {GET_ALL_BOOKS, SINGLE_BOOK_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Book({data}: PageProps) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.book?.seo}
    >
      <article>
        <h1 className="mb-4 text-3xl">{data?.book?.title}</h1>
        {!!data?.book?.featuredImage && (
          <Image
            alt={data?.book?.featuredImage?.node?.altText}
            src={data?.book?.featuredImage?.node?.sourceUrl}
            height={data?.book?.featuredImage?.node?.mediaDetails?.height}
            width={data?.book?.featuredImage?.node?.mediaDetails?.width}
          />
        )}
        <div dangerouslySetInnerHTML={{__html: data?.book?.description}} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await client.query({
    query: GET_ALL_BOOKS
  })

  const paths = data.books.nodes.map((book) => ({
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
      data
    },
    revalidate: 300
  }
}
