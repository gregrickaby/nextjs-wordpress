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
        {content?.tags?.nodes.length > 1 && (
          <>
            Tagged with:{' '}
            {content?.tags?.nodes.map((tag) => (
              <span key={tag?.name}>{tag?.name}</span>
            ))}
          </>
        )}

        <button onClick={() => incrementHeart(hearts)}>
          {hearts} likes{' '}
          <span role="img" arial-label="heart">
            ❤️
          </span>
        </button>
      </footer>
    </article>
  )
}
