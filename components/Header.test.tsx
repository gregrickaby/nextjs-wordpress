import Header from '@/components/Header'
import {render, screen, server} from '@/test-utils'
import {axe} from 'jest-axe'
import {http, HttpResponse} from 'msw'

describe('Header', () => {
  beforeEach(() => {
    // Mock the menu query
    server.use(
      http.post(`${process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL}`, () => {
        return HttpResponse.json({
          data: {
            menu: {
              menuItems: {
                edges: [
                  {
                    node: {
                      databaseId: 1,
                      label: 'Home',
                      uri: '/'
                    }
                  }
                ]
              }
            }
          }
        })
      })
    )
  })

  it('should render the header with site branding', async () => {
    // Since Header is an async Server Component, we need to await it
    const HeaderComponent = await Header()
    render(HeaderComponent)

    // Check for header element
    const header = screen.getByRole('heading', {level: 1})
    expect(header).toBeInTheDocument()
  })

  it('should have no accessibility violations', async () => {
    const HeaderComponent = await Header()
    const {container} = render(HeaderComponent)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
