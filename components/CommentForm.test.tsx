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
    await user.type(screen.getByLabelText(/website/i), 'https://example.com')
    await user.type(screen.getByLabelText(/comment/i), 'This is a test comment')

    // Submit the form
    const submitButton = screen.getByRole('button', {name: /submit/i})
    await user.click(submitButton)

    // Wait for success message
    expect(
      await screen.findByText(/thank you john doe/i, {}, {timeout: 3000})
    ).toBeInTheDocument()

    // Verify form is cleared
    expect(screen.getByLabelText(/name/i)).toHaveValue('')
    expect(screen.getByLabelText(/email/i)).toHaveValue('')
    expect(screen.getByLabelText(/website/i)).toHaveValue('')
    expect(screen.getByLabelText(/comment/i)).toHaveValue('')
  })

  it('should display error message on submission failure', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('createComment')) {
            return HttpResponse.json({
              data: {
                createComment: {
                  success: false,
                  comment: null
                }
              }
            })
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    render(<CommentForm {...mockProps} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/website/i), 'https://example.com')
    await user.type(screen.getByLabelText(/comment/i), 'This is a test comment')

    const submitButton = screen.getByRole('button', {name: /submit/i})
    await user.click(submitButton)

    // Wait for error message
    expect(
      await screen.findByText(/there was an error/i, {}, {timeout: 3000})
    ).toBeInTheDocument()
  })

  it('should clear form after successful submission', async () => {
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
                    content: 'Test'
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

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const websiteInput = screen.getByLabelText(/website/i)
    const commentInput = screen.getByLabelText(/comment/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(websiteInput, 'https://example.com')
    await user.type(commentInput, 'This is a test comment')

    // Verify fields have values before submission
    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(websiteInput).toHaveValue('https://example.com')
    expect(commentInput).toHaveValue('This is a test comment')

    await user.click(screen.getByRole('button', {name: /submit/i}))

    // Wait for form to clear
    await screen.findByText(/thank you/i, {}, {timeout: 3000})

    expect(nameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(websiteInput).toHaveValue('')
    expect(commentInput).toHaveValue('')
  })

  it('should handle API errors gracefully', async () => {
    server.use(
      http.post(
        `${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`,
        async ({request}) => {
          const body = (await request.json()) as {query: string}

          if (body.query.includes('createComment')) {
            return HttpResponse.json({
              data: {
                createComment: null
              },
              errors: [{message: 'Comment submission failed'}]
            })
          }

          return HttpResponse.json({data: {}})
        }
      )
    )

    render(<CommentForm {...mockProps} />)

    await user.type(screen.getByLabelText(/name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/website/i), 'https://example.com')
    await user.type(screen.getByLabelText(/comment/i), 'This is a test comment')

    const submitButton = screen.getByRole('button', {name: /submit/i})
    await user.click(submitButton)

    // Should display error message when API returns null
    expect(
      await screen.findByText(/there was an error/i, {}, {timeout: 3000})
    ).toBeInTheDocument()
  })

  it('should require all fields before submission', () => {
    render(<CommentForm {...mockProps} />)

    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const websiteInput = screen.getByLabelText(/website/i)
    const commentInput = screen.getByLabelText(/comment/i)

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(websiteInput).toBeRequired()
    expect(commentInput).toBeRequired()
  })

  it('should validate email format', () => {
    render(<CommentForm {...mockProps} />)

    const emailInput = screen.getByLabelText(/email/i)

    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute(
      'pattern',
      String.raw`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$`
    )
  })

  it('should validate website URL format', () => {
    render(<CommentForm {...mockProps} />)

    const websiteInput = screen.getByLabelText(/website/i)

    expect(websiteInput).toHaveAttribute('type', 'url')
  })

  it('should have no accessibility violations', async () => {
    const {container} = render(<CommentForm {...mockProps} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
