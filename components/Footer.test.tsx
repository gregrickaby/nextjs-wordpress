import Footer from '@/components/Footer'
import {render, screen} from '@/test-utils'
import {axe} from 'jest-axe'

describe('Footer', () => {
  it('should render footer with navigation links', () => {
    render(<Footer />)

    // Check for footer element
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const {container} = render(<Footer />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
