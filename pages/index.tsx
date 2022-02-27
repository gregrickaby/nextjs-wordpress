import {gql} from '@apollo/client'
import {GetStaticProps} from 'next'
import Image from 'next/image'
import Layout from '~/components/Layout'
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
  const GET_HOMEPAGE = gql`
    query HomePageQuery($slug: ID!) {
      page(id: $slug, idType: URI) {
        title(format: RENDERED)
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
        content(format: RENDERED)
      }
    }
  `

  const {data} = await client.query({
    query: GET_HOMEPAGE,
    variables: {slug: 'homepage'}
  })

  return {
    props: {
      page: data?.page
    }
  }
}

interface PageProps {
  page: {
    title: string
    content: string
    featuredImage: {
      node: {
        altText: string
        sourceUrl: string
        mediaDetails: {
          height: number
          width: number
        }
      }
    }
  }
}
