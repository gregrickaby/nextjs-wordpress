import Comment from '~/components/Comment'
import CommentForm from '~/components/CommentForm'
import {CommentFields, CommentProps} from '~/lib/types'

export default function Comments({comments, postId, total}: CommentProps) {
  return (
    <section id="comments">
      <h2>{total < 1 ? `Start a` : `Join the`} discussion!</h2>
      <ol>
        {comments?.nodes?.map((comment: CommentFields, index: number) => {
          if (comment?.approved) {
            return (
              <li key={index} id={`comment-${comment?.databaseId}`}>
                <Comment {...comment} />
              </li>
            )
          }
        })}
      </ol>
      <CommentForm postId={postId} />
    </section>
  )
}
