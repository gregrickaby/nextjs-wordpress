import Image from 'next/future/image'
import ParseContent from '~/components/ParseContent'
import Reactions from '~/components/Reactions'
import {ContentFields} from '~/lib/types'

export interface ArticleProps {
  content: ContentFields
}

/**
 * Article component.
 */
export default function Article({content}: ArticleProps) {
  return (
    <article>
      <header>
        {content?.categories?.edges?.length >= 1 &&
          content?.categories?.edges?.map(({node}) => (
            <span key={node?.name}>{node?.name}</span>
          ))}
        {content?.title != 'Homepage' && <h1>{content?.title}</h1>}
      </header>
      <section>
        {!!content?.featuredImage && (
          <Image
            alt={content?.featuredImage?.node?.altText}
            height={content?.featuredImage?.node?.mediaDetails?.height}
            priority
            src={content?.featuredImage?.node?.sourceUrl}
            width={content?.featuredImage?.node?.mediaDetails?.width}
          />
        )}
        {!!content?.author?.node?.gravatarUrl && (
          <div>
            <div>Author</div>
            <div>
              <div>
                <cite>{content?.author?.node?.name}</cite>
              </div>
              {!!content?.date && (
                <time>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(Date.parse(content?.date))}
                </time>
              )}
            </div>
          </div>
        )}
      </section>
      <main>
        {content?.contentType?.node?.name === 'post' && (
          <Reactions
            reactions={content?.postFields?.reactions}
            postId={content?.databaseId}
          />
        )}
        <div>{ParseContent(content?.content)}</div>
      </main>
    </article>
  )
}
