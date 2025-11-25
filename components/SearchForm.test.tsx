import SearchForm from '@/components/SearchForm'
import {render, screen, user} from '@/test-utils'
import {axe} from 'jest-axe'

describe('SearchForm', () => {
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

  it('should have no accessibility violations', async () => {
    const {container} = render(<SearchForm />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
