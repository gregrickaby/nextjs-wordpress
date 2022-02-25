import {gql} from '@apollo/client'
import {GetStaticProps} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MenuPrimary from '~/components/Menu'
import {client} from '~/lib/wordpressClient'

export default function Homepage({page}: PageProps) {
  const {title, content} = page

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuPrimary />
      <main>
        <h1>{title}</h1>
        {!!page?.featuredImage && (
          <Image
            alt={page?.featuredImage?.altText}
            src={page?.featuredImage?.sourceUrl}
            height={page?.featuredImage?.height}
            width={page?.featuredImage?.width}
          />
        )}
        <div dangerouslySetInnerHTML={{__html: content}} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const GET_HOMEPAGE = gql`
    query HomePageQuery {
      page(id: "/", idType: URI) {
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
    query: GET_HOMEPAGE
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
