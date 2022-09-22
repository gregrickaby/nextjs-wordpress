import type {NextApiRequest, NextApiResponse} from 'next'

/**
 * Increments the reaction count for a post.
 *
 * @usage http://localhost:3000/api/wordpress/reactions?postID=1&reaction=like&total=1
 *
 * @author Greg Rickaby
 * @see https://www.advancedcustomfields.com/resources/wp-rest-api-integration/
 * @see https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/
 * @see https://nextjs.org/docs/api-routes/introduction
 * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default async function reactions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // No post ID? Bail...
  if (!req.query.postId) {
    return res.status(400).json({
      message: `error`,
      error: `You must pass a post ID in the query string.`
    })
  }

  // No reaction name? Bail...
  if (!req.query.reaction) {
    return res.status(400).json({
      message: `error`,
      error: `You must pass a reaction in the query string.`
    })
  }

  // No total? Bail...
  if (!req.query.total) {
    return res.status(400).json({
      message: `error`,
      error: `You must pass the total reactions in the query string.`
    })
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts/${req.query.postId}?_fields=acf`,
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
        body: JSON.stringify({
          acf: {
            reactions: {
              [req.query.reaction as string]: req.query.total
            }
          }
        })
      }
    )

    // If there's a network error, bail...
    if (response.status != 200) {
      return res
        .status(response.status)
        .json({message: `error`, error: response.statusText})
    }

    const data = await response.json()

    // If WordPress throws an authentication error, bail...
    if (data?.data?.status) {
      return res
        .status(data?.data?.status)
        .json({message: `error`, error: data})
    }

    return res
      .status(200)
      .json({message: `success`, reactions: data?.acf?.reactions})
  } catch (error) {
    return res.status(500).json({message: `error`, error})
  }
}
