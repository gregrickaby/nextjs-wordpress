import parse from 'html-react-parser'
import Image from 'next/future/image'
import Head from 'next/head'
import ParseContent from '~/components/ParseContent'
import Reactions from '~/components/Reactions'
import {ContentFields} from '~/lib/types'
import {AspectRatio} from '@mantine/core'

export interface ArticleProps {
  content: ContentFields
}

/**
 * Article component.
 */
export default function Article({content}: ArticleProps) {
  return (
    <>
      <Head>
        <title>
          {content?.seo?.title
            ? parse(content?.seo?.title)
            : `Next.js WordPress`}
        </title>
        {content?.seo?.metaDesc ? parse(content?.seo?.metaDesc) : null}
        {content?.seo?.fullHead ? parse(content?.seo?.fullHead) : null}
      </Head>

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
            <AspectRatio ratio={1920 / 1080}>
              <Image
                alt={content?.featuredImage?.node?.altText}
                src={content?.featuredImage?.node?.sourceUrl}
                height={content?.featuredImage?.node?.mediaDetails?.height}
                width={content?.featuredImage?.node?.mediaDetails?.width}
                priority
              />
            </AspectRatio>
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
    </>
  )
}
