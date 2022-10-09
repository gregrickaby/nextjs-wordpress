import {createStyles} from '@mantine/core'
import Comment, {CommentFields} from '~/components/Comment'
import CommentForm from '~/components/CommentForm'

export interface CommentProps {
  comments: {
    nodes: CommentFields
  }
  postId: number
  total: number
}

const useStyles = createStyles((theme) => ({
  comments: {
    listStyle: 'none',
    margin: `${theme.spacing.lg}px 0`,
    padding: 0,

    li: {
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[2]
      }`,
      paddingTop: theme.spacing.lg,

      ol: {
        listStyle: 'none',
        padding: `0 0 0 ${theme.spacing.xl}px`,

        li: {
          borderBottom: 'none'
        }
      }
    }
  }
}))

/**
 * Display comments.
 */
export default function Comments({comments, postId, total}: CommentProps) {
  const {classes} = useStyles()
  return (
    <section id="comments">
      <h2>Comments</h2>
      <ol className={classes.comments}>
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
      <h2>{total < 1 ? `Start a` : `Join the`} discussion!</h2>
      <CommentForm postId={postId} />
    </section>
  )
}
