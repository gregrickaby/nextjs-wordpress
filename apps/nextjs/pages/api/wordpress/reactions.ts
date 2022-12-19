import type {NextRequest} from 'next/server'

export const config = {
  runtime: 'edge'
}

export interface ReactionResponse {
  acf: {
    reactions: {
      like: number
      dislike: number
      love: number
    }
  }
}

/**
 * Increments the reaction count for a post.
 *
 * @usage http://localhost:3000/api/wordpress/reactions?postID=1&reaction=like&total=1
 *
 * @author Greg Rickaby
 * @see https://www.advancedcustomfields.com/resources/wp-rest-api-integration/
 * @see https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/
 * @see https://nextjs.org/docs/api-routes/edge-api-routes
 * @see https://nextjs.org/docs/api-reference/edge-runtime
 * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default async function reactions(req: NextRequest) {
  // Get query parameters.
  const postIdParam = new URL(req.url).searchParams.get('postId')
  const reactionParam = new URL(req.url).searchParams.get('reaction')
  const totalParam = new URL(req.url).searchParams.get('total')

  // No query parameters? Bail.
  if (!postIdParam || !reactionParam || !totalParam) {
    return new Response(
      JSON.stringify({error: 'No query parameters provided.'}),
      {
        status: 400,
        statusText: 'Bad Request'
      }
    )
  }

  // Parse the query parameters.
  const postID = parseInt(postIdParam) || 0
  const reaction = reactionParam || ''
  const total = parseInt(totalParam) || 0

  try {
    // Attempt to POST reaction to WordPress REST-API.
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2/posts/${postID}?_fields=acf`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Basic ' +
            btoa(
              `${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APPLICATION_PASSWORD}`
            ) // Edge Runtime does not support `Buffer.from()`.
        },
        body: JSON.stringify({
          acf: {
            reactions: {
              [reaction]: total
            }
          }
        })
      }
    )

    // Issue with the response? Bail.
    if (response.status != 200) {
      return new Response(JSON.stringify({error: response.statusText}), {
        status: response.status,
        statusText: response.statusText
      })
    }

    // Parse the response.
    const data = (await response.json()) as ReactionResponse

    // Return reaction response.
    return new Response(
      JSON.stringify({message: `success`, reactions: data.acf.reactions}),
      {
        status: 200,
        statusText: 'OK'
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({error: `${error}`}), {
      status: 500,
      statusText: 'Internal Server Error'
    })
  }
}
