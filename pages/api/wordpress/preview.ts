import type {NextApiRequest, NextApiResponse} from 'next'

/**
 * Puts Next.js into preview mode and redirects to the preview page.
 *
 * @usage http://localhost:3000/api/wordpress/preview?secret=PREVIEW_SECRET&postId=123
 *
 * @author Greg Rickaby
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 * @see https://nextjs.org/docs/api-routes/introduction
 * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // No preview token? Bail...
  if (req.query.token != process.env.PREVIEW_SECRET_TOKEN) {
    return res.status(401).json({message: 'Invalid preview token.'})
  }

  // No ID? Bail...
  if (!req.query.id) {
    return res.status(400).json({message: 'Missing post ID.'})
  }

  // Create a query to verify the posts exits...
  const previewQuery = {
    query: `
      query PreviewQuery($postID: ID!) {
        contentNode(idType: DATABASE_ID, id: $postID) {
          ... on Post {
            databaseId
          }
          ... on Page {
            databaseId
          }
        }
      }`,
    variables: {
      postID: req.query.id
    }
  }

  try {
    // Make the request to the API...
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
      return res.status(response.status).json({error: response.statusText})
    }

    // Get the response body...
    const data = await response.json()

    // If there's an error, bail...
    if (data.errors) {
      return res.status(500).json({error: data.errors[0].message})
    }

    // Enable preview mode and pass the post ID as context.
    res.setPreviewData({
      postID: req.query.id
    })

    // Finally, redirect to the preview page.
    res.redirect('/preview')
  } catch (error) {
    return res.status(500).json({'try catch error': error.message})
  }
}
