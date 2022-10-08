import Image from 'next/image'
import {sanitizeComment} from '~/lib/helpers'

export interface CommentFields {
  author: {
    node: {
      gravatarUrl: string
      name: string
      url: string
    }
  }
  approved: boolean
  content: string
  databaseId: number
  date: string
  map: any
  parentId: string
}

/**
 * Display a single comment.
 */
export default function Comment(comment: CommentFields) {
  return (
    <article>
      <header>
        <div>
          <Image
            alt={comment?.author?.node?.name}
            height="64"
            loading="lazy"
            src={comment?.author?.node?.gravatarUrl}
            width="64"
          />
          <div>
            <h3>
              {comment?.author?.node?.url ? (
                <a href={comment?.author?.node?.url} rel="external nofollow">
                  {comment?.author?.node?.name}
                </a>
              ) : (
                comment?.author?.node?.name
              )}
            </h3>
            <time>
              {new Intl.DateTimeFormat('en-US', {
                dateStyle: 'full',
                timeStyle: 'short'
              }).format(Date.parse(comment?.date))}
            </time>
          </div>
        </div>
      </header>
      <main>{sanitizeComment(comment?.content)}</main>
    </article>
  )
}
