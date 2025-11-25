import {render, screen} from '@/test-utils'
import {axe} from 'jest-axe'
import {headers} from 'next/headers'
import {vi} from 'vitest'
import NotFound from './not-found'

// Mock Next.js headers
vi.mock('next/headers', () => ({
  headers: vi.fn()
}))

describe('NotFound', () => {
  beforeEach(() => {
    // Mock headers to return a referer
    vi.mocked(headers).mockResolvedValue({
      get: vi.fn((name: string) => {
        if (name === 'referer') {
          return 'https://example.com/previous-page'
        }
        return null
      })
    } as any)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render 404 heading', async () => {
    const NotFoundComponent = await NotFound()
    render(NotFoundComponent)

    expect(screen.getByText('404 - Not Found')).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const NotFoundComponent = await NotFound()
    const {container} = render(NotFoundComponent)

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should render with proper heading hierarchy', async () => {
    const NotFoundComponent = await NotFound()
    render(NotFoundComponent)

    const heading = screen.getByRole('heading', {level: 1})
    expect(heading).toHaveTextContent('404 - Not Found')
  })

  it('should display referer when available', async () => {
    const NotFoundComponent = await NotFound()
    render(NotFoundComponent)

    expect(
      screen.getByText('https://example.com/previous-page')
    ).toBeInTheDocument()
  })
})
