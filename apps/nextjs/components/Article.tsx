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
    <article className="prose prose-stone dark:prose-invert lg:prose-xl m-auto pb-4">
      <header className="mb-4">
        {content?.categories?.edges?.length >= 1 &&
          content?.categories?.edges?.map(({node}) => (
            <span className="font-bold" key={node?.name}>
              {node?.name}
            </span>
          ))}
        {content?.title != 'Homepage' && (
          <h1 className="lg:mb-6">{content?.title}</h1>
        )}
      </header>
      <section className="space-y-4">
        {!!content?.featuredImage && (
          <Image
            alt={content?.featuredImage?.node?.altText}
            className="m-0 lg:m-0"
            height={content?.featuredImage?.node?.mediaDetails?.height}
            priority
            src={content?.featuredImage?.node?.sourceUrl}
            width={content?.featuredImage?.node?.mediaDetails?.width}
          />
        )}
        {!!content?.author?.node?.gravatarUrl && (
          <div className="flex flex-col border-b-2 border-b-zinc-200 pb-4 dark:border-b-zinc-600">
            <div className="mb-3 font-mono text-sm">Author</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <cite className="text-sm font-bold not-italic">
                  {content?.author?.node?.name}
                </cite>
              </div>
              {!!content?.date && (
                <time className="border-l-2 pl-3 font-mono text-sm dark:border-l-zinc-600 lg:pl-4">
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
      <main className="flex flex-col justify-between md:flex-row md:space-x-8">
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
