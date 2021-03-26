import {gql, useQuery} from '@apollo/client'
import Image from 'next/image'

export default function ImageBlock(attributes) {
  const url = attributes?.url

  const GET_MEDIA_BY_ID = gql`
    query getMediaById($url: ID!) {
      mediaItem(id: $url, idType: SOURCE_URL) {
        alt
        mediaDetails {
          height
          width
        }
      }
    }
  `

  const {loading, error, data} = useQuery(GET_MEDIA_BY_ID, {
    variables: {url}
  })

  

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <Image
        src={url}
        height={data?.mediaItem?.mediaDetails?.height}
        width={data?.mediaItem?.mediaDetails?.width}
      /> */}
    </>
  )
}
