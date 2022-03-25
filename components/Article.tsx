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
      <div className="flex justify-between">
        <cite>{content?.author?.node?.name}</cite>
        {content?.date && (
          <time>
            {new Intl.DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }).format(Date.parse(content?.date))}
          </time>
        )}
      </div>
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
      {content?.categories?.nodes.map((category) => (
        <div key={category?.name}>
          Posted under: <span>{category?.name}</span>
        </div>
      ))}
      {content?.tags?.nodes.map((tag) => (
        <div key={tag?.name}>
          Tagged with: <span>{tag?.name}</span>
        </div>
      ))}
    </article>
  )
}
