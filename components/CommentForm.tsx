import {useMutation} from '@apollo/client'
import {useForm} from 'react-hook-form'
import {CREATE_COMMENT} from '~/lib/mutations'

export default function CommentForm() {
  const {register, handleSubmit} = useForm()
  const [addComment, {error, data}] = useMutation(CREATE_COMMENT)

  if (error) {
    return (
      <div>
        <h2 className="text-red-500">Error!</h2>
        {!!error.graphQLErrors &&
          error.graphQLErrors.length >= 1 &&
          error.graphQLErrors.map((error, index) => (
            <p key={index} className="font-mono text-red-500">
              {error.message}
            </p>
          ))}
      </div>
    )
  }

  function onSubmit(form) {
    addComment({
      variables: {
        authorName: form.authorName,
        authorEmail: form.authorEmail,
        authorUrl: form?.authorUrl,
        comment: form.comment,
        postID: 1
      }
    })
  }

  if (data) {
    return (
      <div>
        <h2 className="text-green-500">Success!</h2>
        <p className="font-mono text-green-500">
          {data.createComment.success
            ? 'Your comment has been created'
            : 'There was an error creating your comment'}
        </p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    )
  }

  return (
    <>
      <h2>Leave a comment</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-w-md flex-col space-y-4"
        name="comment-form"
      >
        <input
          {...register('authorName', {required: true})}
          className="field"
          type="text"
        />
        <input
          {...register('authorEmail', {required: true})}
          className="field"
          type="email"
        />
        <input {...register('authorUrl')} className="field" type="url" />
        <textarea
          {...register('comment', {required: true})}
          className="field"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
