import type {NextApiRequest, NextApiResponse} from 'next'

interface ResponseData {
  message: string
}

/**
 * On Demand Revalidation
 *
 * @author Greg Rickaby
 * @see https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration#on-demand-revalidation-beta
 * @see https://nextjs.org/docs/api-routes/introduction
 * @see https://nodejs.org/api/http.html#http_class_http_incomingmessage
 * @see https://nodejs.org/api/http.html#http_class_http_serverresponse
 */
export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.body.secret !== process.env.PREVIEW_SECRET_TOKEN) {
    return res
      .status(401)
      .json({message: 'Invalid revalidate token. Please check your .env file.'})
  }

  if (!req.body.slug) {
    return res.status(400).json({
      message: 'A slug is required to revalidate the cache.'
    })
  }

  try {
    await res.unstable_revalidate(req.body.slug as string)
    return res.status(200).json({
      message: `Success! The cache for ${req.body.slug} was successfully revalidated.`
    })
  } catch (err: any) {
    return res.status(500).json({
      message: err.message
    })
  }
}
