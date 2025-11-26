import config from '@/lib/config'
import * as getPreviewModule from '@/lib/queries/getPreview'
import {render, screen} from '@/test-utils'
import Preview, {generateMetadata} from './page'

describe('app/preview/[slug]/page (Server Component)', () => {
  it('generateMetadata returns preview SEO including OG image when present', async () => {
    const example = {
      slug: '123',
      title: 'Draft Title',
      excerpt: 'Draft excerpt',
      featuredImage: {
        node: {
          sourceUrl: 'https://example.com/og.jpg',
          mediaDetails: {width: 1200, height: 630},
          altText: 'Alt'
        }
      },
      author: {node: {name: 'Greg'}},
      date: '2024-02-02'
    }
    const spy = vi
      .spyOn(getPreviewModule, 'default')
      .mockResolvedValue(example as any)
    const meta = await generateMetadata({
      params: Promise.resolve({slug: '123'})
    } as any)
    expect(meta).toMatchObject({
      title: `Draft Title - ${config.siteName}`,
      description: 'Draft excerpt',
      robots: 'noindex',
      openGraph: {
        title: `Draft Title - ${config.siteName}`,
        description: 'Draft excerpt',
        url: `${config.siteUrl}/blog/123`,
        siteName: config.siteName,
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: 'https://example.com/og.jpg',
            width: 1200,
            height: 630,
            alt: 'Alt'
          }
        ]
      }
    })
    spy.mockRestore()
  })

  it('generateMetadata returns empty object when no preview', async () => {
    const spy = vi
      .spyOn(getPreviewModule, 'default')
      .mockResolvedValue(null as any)
    const meta = await generateMetadata({
      params: Promise.resolve({slug: 'missing'})
    } as any)
    expect(meta).toEqual({})
    spy.mockRestore()
  })

  it('renders message when secret missing or invalid', async () => {
    const Component = await Preview({
      params: Promise.resolve({slug: '123'}),
      searchParams: Promise.resolve({secret: undefined})
    } as any)
    render(Component)
    expect(screen.getByText(/requires a preview secret/i)).toBeInTheDocument()
  })

  it('renders preview content when secret is valid', async () => {
    // Stub env for this test
    const originalSecret = process.env.NEXTJS_PREVIEW_SECRET
    process.env.NEXTJS_PREVIEW_SECRET = 'top-secret'

    const example = {
      databaseId: 303,
      slug: '123',
      title: 'Draft Title',
      excerpt: 'Draft excerpt',
      content: '<p>Preview content</p>',
      author: {node: {name: 'Greg'}},
      date: '2024-02-02',
      categories: {nodes: [{databaseId: 1, name: 'Cat'}]},
      tags: {nodes: [{databaseId: 2, name: 'Tag'}]}
    }

    const spy = vi
      .spyOn(getPreviewModule, 'default')
      .mockResolvedValue(example as any)

    const Component = await Preview({
      params: Promise.resolve({slug: '123'}),
      searchParams: Promise.resolve({secret: 'top-secret'})
    } as any)

    render(Component)
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
      'Draft Title'
    )
    expect(screen.getByText(/By Greg/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Categories/i})
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: /Tags/i})).toBeInTheDocument()

    spy.mockRestore()
    process.env.NEXTJS_PREVIEW_SECRET = originalSecret
  })

  it('renders preview error when post not found', async () => {
    const originalSecret = process.env.NEXTJS_PREVIEW_SECRET
    process.env.NEXTJS_PREVIEW_SECRET = 'top-secret'

    const spy = vi
      .spyOn(getPreviewModule, 'default')
      .mockResolvedValue(null as any)

    const Component = await Preview({
      params: Promise.resolve({slug: '999'}),
      searchParams: Promise.resolve({secret: 'top-secret'})
    } as any)
    render(Component)
    expect(screen.getByText(/Preview Error/i)).toBeInTheDocument()
    // Match straight apostrophe as rendered in DOM
    expect(
      screen.getByText(/Couldn't find a WordPress post/i)
    ).toBeInTheDocument()

    spy.mockRestore()
    process.env.NEXTJS_PREVIEW_SECRET = originalSecret
  })
})
