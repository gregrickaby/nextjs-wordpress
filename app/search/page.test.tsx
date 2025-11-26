import {render, screen} from '@/test-utils'
import Page from './page'

describe('Search Page', () => {
  it('should render search heading', () => {
    render(<Page />)

    expect(
      screen.getByRole('heading', {name: /search/i, level: 1})
    ).toBeInTheDocument()
  })

  it('should render SearchForm component', () => {
    render(<Page />)

    // SearchForm has a searchbox role
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('should have correct layout structure', () => {
    const {container} = render(<Page />)

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex', 'flex-col', 'gap-8')
  })
})
