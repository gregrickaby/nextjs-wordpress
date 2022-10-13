import {createStyles, Title} from '@mantine/core'
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
    borderTop: `1px solid ${theme.colors.gray[3]}`,

    '& > *': {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl
    }
  },

  inner: {
    listStyle: 'none',
    padding: 0,

    '& > *': {
      marginTop: theme.spacing.xl,
      marginBottom: theme.spacing.xl
    },

    li: {
      borderBottom: `1px solid ${theme.colors.gray[3]}`,

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
    <section id="comments" className={classes.comments}>
      <ol className={classes.inner}>
        {comments.nodes.map(
          (comment: CommentFields, index: number) =>
            !!comment.approved && (
              <li key={index} id={`comment-${comment.databaseId}`}>
                {comment.parentId ? (
                  <ol>
                    <li key={index} id={`comment-${comment.databaseId}`}>
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
      <Title order={2}>{total < 1 ? `Start a` : `Join the`} discussion!</Title>
      <CommentForm postId={postId} />
    </section>
  )
}
