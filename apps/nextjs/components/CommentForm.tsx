import {useMutation} from '@apollo/client'
import {
  Button,
  createStyles,
  Stack,
  Text,
  Textarea,
  TextInput
} from '@mantine/core'
import {useForm} from '@mantine/form'
import {showNotification} from '@mantine/notifications'
import {IconAlertCircle, IconMessage} from '@tabler/icons-react'
import parse from 'html-react-parser'
import Comment from '~/components/Comment'
import {CREATE_COMMENT} from '~/lib/queries'

export interface CommentFormProps {
  postId: number
}

const useStyles = createStyles((theme) => ({
  button: {
    maxWidth: '115px'
  }
}))

/**
 * Comment form component.
 */
export default function CommentForm({postId}: CommentFormProps) {
  const {classes} = useStyles()

  /**
   * Setup comment form.
   *
   * @see https://mantine.dev/form/use-form/
   */
  const commentForm = useForm({
    initialValues: {
      authorName: '',
      authorEmail: '',
      authorUrl: '',
      comment: '',
      postID: postId
    },
    validate: {
      authorName: (value) =>
        value.length < 3 ? 'Name must be at least 3 characters!' : null,
      authorEmail: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email!',
      comment: (value) =>
        value.length < 1 ? 'Comment must be at least 1 character!' : null
    }
  })

  /**
   * Setup comment submission mutation.
   *
   * @see https://mantine.dev/others/notifications/
   * @see https://www.apollographql.com/docs/react/data/mutations/#usemutation-api
   */
  const [addComment, {data, loading}] = useMutation(CREATE_COMMENT, {
    onCompleted: () =>
      showNotification({
        title: 'Success',
        message:
          'Your comment has been submitted and may be held for moderation.',
        color: 'green',
        icon: <IconMessage />
      }),
    onError: (error) =>
      showNotification({
        title: 'Error',
        message: error.message
          ? parse(error.message)
          : 'There was an error submitting your comment.',
        color: 'red',
        icon: <IconAlertCircle />
      })
  })

  return (
    <>
      {
        // If the user submits a comment, display it or the moderation message.
        !loading && data && (
          <ol>
            {data.createComment.success &&
            data.createComment.comment != null ? (
              <li>
                <Comment {...data.createComment.comment} />
              </li>
            ) : (
              <p>Your comment is awaiting moderation.</p>
            )}
          </ol>
        )
      }

      <form
        name="comment-form"
        onSubmit={commentForm.onSubmit((values) =>
          addComment({
            variables: {
              authorName: values.authorName,
              authorEmail: values.authorEmail,
              authorUrl: values.authorUrl,
              comment: values.comment,
              postID: postId
            }
          })
        )}
      >
        <Stack>
          <TextInput
            aria-label="Your first and last name"
            placeholder="Jane Doe"
            required
            withAsterisk
            {...commentForm.getInputProps('authorName')}
          />
          <TextInput
            aria-label="Your email address"
            placeholder="email@example.com"
            required
            type="email"
            withAsterisk
            {...commentForm.getInputProps('authorEmail')}
          />
          <TextInput
            aria-label="Your website address"
            placeholder="https://example.com"
            type="url"
            {...commentForm.getInputProps('authorUrl')}
          />
          <Textarea
            aria-label="Add your comment"
            placeholder="Add your comment"
            required
            withAsterisk
            {...commentForm.getInputProps('comment')}
          />
          <Text color="dimmed" size="xs">
            Tip: Basic HTML tags such as <code>&lt;strong&gt;</code>,{' '}
            <code>&lt;em&gt;</code>, <code>&lt;pre&gt;</code>,{' '}
            <code>&lt;code&gt;</code>, are allowed. Press enter twice to create
            a new paragraph.
          </Text>
          <Button
            aria-label="Click to submit your comment"
            className={classes.button}
            loading={loading}
            type="submit"
          >
            Submit
          </Button>
        </Stack>
      </form>
    </>
  )
}
