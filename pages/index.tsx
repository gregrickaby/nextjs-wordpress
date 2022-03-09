import {GetStaticProps} from 'next'
import Image from 'next/image'
import Layout from '~/components/Layout'
import {SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'
import {client} from '~/lib/wordpressClient'

export default function Homepage({page}: PageProps) {
  const {title, content} = page

  return (
    <Layout>
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
        <div dangerouslySetInnerHTML={{__html: content}} />
      </article>
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
      page: data?.page
    }
  }
}
