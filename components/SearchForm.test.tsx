import SearchForm from '@/components/SearchForm'
import {render, screen, user, waitFor} from '@/test-utils'
import {axe} from 'jest-axe'

describe('SearchForm', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render search input', () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    expect(searchInput).toBeInTheDocument()
  })

  it('should handle user input', async () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'test query')

    expect(searchInput).toHaveValue('test query')
  })

  it('should debounce search input', async () => {
    const mockFetch = vi.fn()
    globalThis.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })

    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')

    // Type characters
    await user.type(searchInput, 'test')

    // Wait for debounced search to execute (500ms delay + execution time)
    await waitFor(() => expect(mockFetch).toHaveBeenCalled(), {timeout: 2000})
  })

  it('should reset search when reset button is clicked', async () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    const resetButton = screen.getByRole('button', {name: /reset/i})

    // Type something
    await user.type(searchInput, 'test query')
    expect(searchInput).toHaveValue('test query')

    // Click reset
    await user.click(resetButton)

    // Input should be cleared
    expect(searchInput).toHaveValue('')
  })

  it('should display searching message while debouncing', async () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'test')

    // Should show searching message (before debounce completes)
    await waitFor(
      () => {
        expect(
          screen.queryByText(/searching/i) || screen.queryByText(/no results/i)
        ).toBeInTheDocument()
      },
      {timeout: 1000}
    )
  })

  it('should display no results message when search returns empty', async () => {
    const mockFetch = vi.fn()
    globalThis.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: async () => []
    })

    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'nonexistent')

    // Wait for search to complete and show no results
    await waitFor(
      () => expect(screen.getByText(/no results found/i)).toBeInTheDocument(),
      {timeout: 2000}
    )
  })

  it('should display search results when found', async () => {
    const mockResults = [
      {
        id: 1,
        title: 'Test Post 1',
        url: 'https://blog.nextjswp.com/test-post-1'
      },
      {
        id: 2,
        title: 'Test Post 2',
        url: 'https://blog.nextjswp.com/test-post-2'
      }
    ]

    const mockFetch = vi.fn()
    globalThis.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResults
    })

    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'test')

    // Wait for results
    await waitFor(
      () => {
        expect(screen.getByText(/nice! you found/i)).toBeInTheDocument()
        // Check for the count span specifically, not just "2" which appears in multiple places
        const countSpan = screen
          .getByText(/nice! you found/i)
          .parentElement?.querySelector('span')
        expect(countSpan).toHaveTextContent('2')
      },
      {timeout: 2000}
    )

    // Verify results are displayed
    expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    expect(screen.getByText('Test Post 2')).toBeInTheDocument()
  })

  it('should handle search errors gracefully', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const mockFetch = vi.fn()
    globalThis.fetch = mockFetch.mockRejectedValue(new Error('Network error'))

    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    await user.type(searchInput, 'test')

    // Wait for error handling
    await waitFor(() => expect(consoleErrorSpy).toHaveBeenCalled(), {
      timeout: 2000
    })

    consoleErrorSpy.mockRestore()
  })

  it('should not search with empty query', async () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')

    // Type and then clear
    await user.type(searchInput, 'test')
    await user.clear(searchInput)

    // Wait a bit to ensure debounce would have triggered
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Should not show results with empty query
    expect(screen.queryByText(/nice! you found/i)).not.toBeInTheDocument()
  })

  it('should not search with query longer than 100 characters', async () => {
    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')
    const longQuery = 'a'.repeat(101)

    await user.type(searchInput, longQuery)

    // Wait for debounce
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Should not show results for overly long query
    expect(screen.queryByText(/nice! you found/i)).not.toBeInTheDocument()
  })

  it('should clear results when query is cleared', async () => {
    const mockResults = [
      {
        id: 1,
        title: 'Test Post',
        url: 'https://blog.nextjswp.com/test-post'
      }
    ]

    const mockFetch = vi.fn()
    globalThis.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockResults
    })

    render(<SearchForm />)

    const searchInput = screen.getByRole('searchbox')

    // Type and search
    await user.type(searchInput, 'test')

    await waitFor(
      () => {
        expect(screen.getByText('Test Post')).toBeInTheDocument()
      },
      {timeout: 2000}
    )

    // Clear search
    await user.clear(searchInput)

    // Results should be cleared
    await waitFor(() => {
      expect(screen.queryByText('Test Post')).not.toBeInTheDocument()
    })
  })

  it('should have no accessibility violations', async () => {
    const {container} = render(<SearchForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
