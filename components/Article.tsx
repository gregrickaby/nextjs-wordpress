import Image from 'next/image'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import parseContent from '~/lib/parseContent'
import {ArticleProps} from '~/lib/types'

export default function Article({content}: ArticleProps) {
  const [hearts, setHearts] = useState(0)

  function incrementHeart(totalHearts: number) {
    fetch(
      `/api/wordpress/hearts?postID=${content?.databaseId}&hearts=${
        totalHearts + 1
      }`,
      {
        method: 'POST'
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setHearts(data.hearts)
      })
  }

  useEffect(() => setHearts(content?.hearts?.hearts), [content])

  return (
    <article>
      <header className="mb-16 text-center">
        {content?.categories?.edges?.length >= 1 &&
          content?.categories?.edges?.map(({node}) => (
            <span key={node?.name}>{node?.name}</span>
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
              {' '}
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
        {content?.tags?.edges.length >= 1 && (
          <>
            Tagged with:{' '}
            {content?.tags?.edges.map(({node}) => (
              <span key={node?.name} className="mx-1 p-1 dark:bg-zinc-600">
                {node?.name}
              </span>
            ))}
          </>
        )}
        {content?.contentType?.node?.name === 'post' && (
          <div>
            <button onClick={() => incrementHeart(hearts)}>
              {!hearts ? 0 : hearts} likes{' '}
              <span role="img" arial-label="heart">
                ❤️
              </span>
            </button>
          </div>
        )}
      </footer>
    </article>
  )
}
