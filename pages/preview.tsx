import {GetServerSideProps} from 'next'
import Article from '~/components/Article'
import Layout from '~/components/Layout'

export default function Preview({data}) {
  return (
    <Layout
      settings={data?.generalSettings}
      menu={data?.menu}
      seo={data?.post?.seo}
    >
      <Article content={data.contentNode} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Get the PostID from preview mode context.
  // @ts-ignore
  const postID = context.previewData.postID

  // The GraphQL query.
  const previewQuery = {
    query: `
      query PreviewQuery($postID: ID!, $menuID: ID!) {
        contentNode(idType: DATABASE_ID, id: $postID) {
          ... on Post {
            author {
              node {
                gravatarUrl
                name
              }
            }
            categories {
              edges {
                node {
                  name
                  uri
                }
              }
            }
            date
            databaseId
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
            postFields {
              reactions {
                like
                dislike
                love
              }
            }
            title(format: RENDERED)
            content(format: RENDERED)
            seo {
              fullHead
              title
              metaDesc
            }
            tags {
              edges {
                node {
                  name
                  uri
                }
              }
            }
          }
          ... on Page {
            title(format: RENDERED)
            content(format: RENDERED)
          }
        }
        generalSettings {
          dateFormat
          language
          title
          timeFormat
          description
        }
        menu(id: $menuID, idType: NAME) {
          menuItems {
            nodes {
              path
              target
              label
            }
          }
        }
      }`,
    variables: {
      postID: postID,
      menuID: 'primary'
    }
  }

  // Get the post data.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' +
          Buffer.from(
            `${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APPLICATION_PASSWORD}`,
            'binary'
          ).toString('base64')
      },
      body: JSON.stringify(previewQuery)
    }
  )

  // Bad response? Bail...
  if (response.status !== 200) {
    console.error(response.statusText)
  }

  // Parse the response.
  const post = await response.json()

  // Bad response? Bail...
  if (post.errors) {
    console.error(post.errors)
  }

  return {
    props: {
      data: post.data || {}
    }
  }
}
