import MenuPrimary from '@/components/Menus/MenuPrimary'
import displayBlock from '@/lib/displayBlock'
import {client} from '@/lib/wordpress/client'
import styles from '@/styles/Home.module.css'
import {gql} from '@apollo/client'
import Head from 'next/head'

/**
 * The homepage.
 *
 * @author Greg Rickaby
 * @param {object} props The component data as props.
 * @param {object} page  The homepage data.
 * @return {Element}     The homepage component.
 */
export default function Homepage({page}) {
  const blocks = JSON.parse(page?.blocksJSON)

  return (
    <div className={styles.container}>
      <Head>
        <title>{page?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuPrimary />
      <main className={styles.main}>
        <h1>{page?.title}</h1>
        {!!blocks?.length &&
          blocks.map((block, index) => {
            return displayBlock(block, index)
          })}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const GET_HOMEPAGE = gql`
    query HomePageQuery {
      page(id: "homepage", idType: URI) {
        title(format: RENDERED)
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
    query: GET_HOMEPAGE
  })

  return {
    props: {
      page: data?.page
    }
  }
}
