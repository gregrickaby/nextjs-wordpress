import parseComment from '~/lib/parseComment'
import {CommentFields} from '~/lib/types'

export default function Comment(comment: CommentFields) {
  return (
    <article>
      <header>
        <img
          alt={comment?.author?.node?.name}
          height="50"
          loading="lazy"
          src={comment?.author?.node?.gravatarUrl}
          width="50"
        />
        <h3>
          <a href={comment?.author?.node?.url} rel="external nofollow">
            {comment?.author?.node?.name}
          </a>
          <time>{comment?.date}</time>
        </h3>
      </header>
      <main>{parseComment(comment?.content)}</main>
    </article>
  )
}
