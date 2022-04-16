import Image from 'next/image'
import Link from 'next/link'
import parseContent from '~/lib/parseContent'
import {ArticleProps} from '~/lib/types'

export default function Article({content}: ArticleProps) {
  return (
    <article>
      <header className="mb-16 text-center">
        {content?.categories?.nodes.length > 1 &&
          content?.categories?.nodes.map((category) => (
            <span key={category?.name}>{category?.name}</span>
          ))}
        <h1 className="lg:mb-0">
          {content?.uri ? (
            <Link href={content?.uri}>
              <a>{content?.title}</a>
            </Link>
          ) : (
            content?.title
          )}
        </h1>
        <p>
          {!!content?.author?.node?.name && (
            <>
              By <cite>{content?.author?.node?.name}</cite>
            </>
          )}
          {!!content?.date && (
            <>
              on{' '}
              <time>
                {new Intl.DateTimeFormat('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                }).format(Date.parse(content?.date))}
              </time>
            </>
          )}
        </p>
      </header>
      {!!content?.featuredImage && (
        <aside>
          <Image
            alt={content?.featuredImage?.node?.altText}
            src={content?.featuredImage?.node?.sourceUrl}
            height={content?.featuredImage?.node?.mediaDetails?.height}
            width={content?.featuredImage?.node?.mediaDetails?.width}
          />
        </aside>
      )}
      <main>{parseContent(content?.content || content?.excerpt)}</main>
      <footer>
        {content?.tags?.nodes.length > 1 && (
          <>
            Tagged with:{' '}
            {content?.tags?.nodes.map((tag) => (
              <span key={tag?.name}>{tag?.name}</span>
            ))}
          </>
        )}
      </footer>
    </article>
  )
}
