import Image from 'next/image'
import Link from 'next/link'
import {ArticleProps} from '~/lib/types'

export default function Article({content}: ArticleProps) {
  return (
    <article>
      <h1 className="mb-4 text-3xl">
        {content?.uri ? (
          <Link href={content?.uri}>
            <a>{content?.title}</a>
          </Link>
        ) : (
          content?.title
        )}
      </h1>
      {!!content?.featuredImage && (
        <Image
          alt={content?.featuredImage?.node?.altText}
          src={content?.featuredImage?.node?.sourceUrl}
          height={content?.featuredImage?.node?.mediaDetails?.height}
          width={content?.featuredImage?.node?.mediaDetails?.width}
        />
      )}
      <div
        dangerouslySetInnerHTML={{__html: content?.content || content?.excerpt}}
      />
    </article>
  )
}
