import {CommentFields} from '~/lib/types'

export default function Comments({total, comments}) {
  return (
    <section id="comments">
      <h2>{total < 1 ? `Start a` : `Join the`} discussion!</h2>
      <ol>
        {comments?.nodes?.map((comment: CommentFields, index: number) => {
          if (comment?.approved) {
            return (
              <li key={index} id={`comment-${comment?.databaseId}`}>
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
                      <a
                        href={comment?.author?.node?.url}
                        rel="external nofollow"
                      >
                        {comment?.author?.node?.name}
                      </a>
                      <time>{comment?.date}</time>
                    </h3>
                  </header>
                  <main dangerouslySetInnerHTML={{__html: comment?.content}} />
                </article>
              </li>
            )
          }
        })}
      </ol>
    </section>
  )
}
