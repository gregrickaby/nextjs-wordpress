import Comment, {CommentFields} from '~/components/Comment'
import CommentForm from '~/components/CommentForm'

export interface CommentProps {
  comments: {
    nodes: CommentFields
  }
  postId: number
  total: number
}

/**
 * Display comments.
 */
export default function Comments({comments, postId, total}: CommentProps) {
  return (
    <section id="comments">
      <h2>{total < 1 ? `Start a` : `Join the`} discussion!</h2>
      <ol>
        {comments?.nodes?.map(
          (comment: CommentFields, index: number) =>
            !!comment?.approved && (
              <li key={index} id={`comment-${comment?.databaseId}`}>
                {comment?.parentId ? (
                  <ol>
                    <li key={index} id={`comment-${comment?.databaseId}`}>
                      <Comment {...comment} />
                    </li>
                  </ol>
                ) : (
                  <Comment {...comment} />
                )}
              </li>
            )
        )}
      </ol>
      <CommentForm postId={postId} />
    </section>
  )
}
