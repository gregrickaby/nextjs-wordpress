import type {NextApiRequest, NextApiResponse} from 'next'

/**
 * Increments the heart count for a post.
 *
 * @usage http://localhost:3000/api/wordpress/hearts?postID=1&hearts=2
 *
 * @author Greg Rickaby
 * @see https://www.advancedcustomfields.com/resources/wp-rest-api-integration/
 * @see https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/
 * @see https://nextjs.org/docs/api-routes/introduction
 * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default async function hearts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // No hearts? Bail...
  if (!req.query.hearts) {
    return res
      .status(400)
      .json({message: 'You must pass a heart in the query string.'})
  }

  // No post ID? Bail...
  if (!req.query.postID) {
    return res
      .status(400)
      .json({message: 'You must pass a post ID in the query string.'})
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts/${req.query.postID}`,
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
            hearts: req.query.hearts
          }
        })
      }
    )

    const data = await response.json()

    // If WordPress throws an authentication error, bail...
    if (data?.data?.status) {
      return res.status(data?.data?.status).json(data)
    }

    // If the hearts match, continue.
    if (data?.acf?.hearts == req.query.hearts) {
      return res
        .status(200)
        .json({message: `Success!`, hearts: data?.acf?.hearts})
    } else {
      // If there's an error, bail...
      return res.status(500).json({
        message: `Error! Something went wrong. Please check the request and try again.`
      })
    }
  } catch (error) {
    return res.status(500).json({message: error})
  }
}
