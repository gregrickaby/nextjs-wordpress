import {GetStaticProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'
import {client} from '~/lib/helpers'
import {SINGLE_PAGE_QUERY} from '~/lib/queries'
import {PageProps} from '~/lib/types'

/**
 * 404 component.
 *
 * This component displays the custom 404 content.
 */
export default function Custom404({data}: PageProps) {
  return (
    <Layout>
      <Article content={data.page} />
    </Layout>
  )
}

/**
 * Query data and pass it to the page component.
 *
 * @see https://nextjs.org/docs/api-reference/data-fetching/get-static-props
 */
export const getStaticProps: GetStaticProps = async () => {
  // Query the 404 page.
  const {data} = await client.query({
    query: SINGLE_PAGE_QUERY,
    variables: {slug: '404-not-found'}
  })

  // Pass data via props and revalidate every hour.
  return {
    props: {
      data
    },
    revalidate: 3600
  }
}
