import config from '@/lib/config'
import * as getCategoryBySlugModule from '@/lib/queries/getCategoryBySlug'
import {render, screen} from '@/test-utils'
import type {Metadata} from 'next'
import CategoryArchive, {generateMetadata} from './page'
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found')
  }
}))

describe('app/blog/category/[slug]/page (Server Component)', () => {
  const posts = [
    {
      databaseId: 11,
      slug: 'first',
      title: 'First <em>Post</em>',
      excerpt: '<p>Excerpt</p>',
      commentCount: 3,
      featuredImage: {
        node: {
          altText: 'Alt',
          sourceUrl: 'https://example.com/img.jpg',
          mediaDetails: {width: 280, height: 233}
        }
      }
    }
  ]

  it('generateMetadata returns category-specific title/description', async () => {
    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'tech'})
    } as any)) as Metadata
    expect(meta).toMatchObject({
      title: `tech Archives - ${config.siteName}`,
      description: 'The category archive for tech'
    })
  })

  it('renders category archive with posts', async () => {
    const spy = vi
      .spyOn(getCategoryBySlugModule, 'default')
      .mockResolvedValue(posts as any)

    const Component = await CategoryArchive({
      params: Promise.resolve({slug: 'tech'})
    } as any)

    render(Component)
    expect(
      screen.getByRole('heading', {name: /Post Category: tech/i})
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
      'First Post'
    )
    expect(screen.getByRole('link', {name: /View Post/i})).toHaveAttribute(
      'href',
      '/blog/first'
    )
    spy.mockRestore()
  })

  it('throws via notFound() when no posts are found', async () => {
    const spy = vi
      .spyOn(getCategoryBySlugModule, 'default')
      .mockResolvedValue(null as any)

    await expect(
      CategoryArchive({params: Promise.resolve({slug: 'empty'})} as any)
    ).rejects.toThrow('not found')
    spy.mockRestore()
  })
})
