import {gql} from '@apollo/client'
import Head from 'next/head'
import {client} from '@/lib/wordpress/connector'
import styles from '../styles/Home.module.css'

/**
 * The homepage.
 *
 * @author Greg Rickaby
 * @param {object} props The component data as props.
 * @param {object} page  The homepage data.
 * @return {Element}     The homepage component.
 */
export default function Homepage({page}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{page?.title}</h1>
        <div dangerouslySetInnerHTML={{__html: page?.content}} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const GET_HOMEPAGE = gql`
    query HomePageQuery {
      page(id: "homepage", idType: URI) {
        title
        content(format: RAW)
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
