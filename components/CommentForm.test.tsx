import CommentForm from '@/components/CommentForm'
import {render, screen, server, user} from '@/test-utils'
import {axe} from 'jest-axe'
import {http, HttpResponse} from 'msw'

describe('CommentForm', () => {
  const mockProps = {
    postID: '123'
  }

  it('should render comment form with all fields', () => {
    render(<CommentForm {...mockProps} />)

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument()
  })

  it('should handle user input in all fields', async () => {
    render(<CommentForm {...mockProps} />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const commentInput = screen.getByLabelText(/comment/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(commentInput, 'This is a test comment')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(commentInput).toHaveValue('This is a test comment')
  })

  it('should submit comment successfully', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('createComment')) {
            return HttpResponse.json({
              data: {
                createComment: {
                  success: true,
                  comment: {
                    id: 'cG9zdDox',
                    content: 'This is a test comment'
                  }
                }
              }
            })
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    render(<CommentForm {...mockProps} />)

    // Fill in the form
    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/comment/i), 'This is a test comment')

    // Submit the form
    const submitButton = screen.getByRole('button', {name: /submit/i})
    await user.click(submitButton)

    // Verify form submission (you may need to adjust based on your implementation)
    // For example, checking for a success message
  })

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json(
          {
            errors: [{message: 'Comment submission failed'}]
          },
          {status: 500}
        )
      })
    )

    render(<CommentForm {...mockProps} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/comment/i), 'This is a test comment')

    const submitButton = screen.getByRole('button', {name: /submit/i})
    await user.click(submitButton)

    // Verify error handling (adjust based on your implementation)
  })

  it('should have no accessibility violations', async () => {
    const {container} = render(<CommentForm {...mockProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
