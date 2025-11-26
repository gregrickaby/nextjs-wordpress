import config from '@/lib/config'
import * as getTagBySlugModule from '@/lib/queries/getTagBySlug'
import {render, screen} from '@/test-utils'
import type {Metadata} from 'next'
import TagArchive, {generateMetadata} from './page'
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found')
  }
}))

describe('app/blog/tag/[slug]/page (Server Component)', () => {
  // Stub query function directly

  const posts = [
    {
      databaseId: 21,
      slug: 'first',
      title: 'First <em>Post</em>',
      excerpt: '<p>Excerpt</p>',
      commentCount: 5,
      featuredImage: {
        node: {
          altText: 'Alt',
          sourceUrl: 'https://example.com/img.jpg',
          mediaDetails: {width: 280, height: 233}
        }
      }
    }
  ]

  it('generateMetadata returns tag-specific title/description', async () => {
    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'nextjs'})
    } as any)) as Metadata
    expect(meta).toMatchObject({
      title: `nextjs Archives - ${config.siteName}`,
      description: 'The tag archive for nextjs'
    })
  })

  it('renders tag archive with posts', async () => {
    const spy = vi
      .spyOn(getTagBySlugModule, 'default')
      .mockResolvedValue(posts as any)

    const Component = await TagArchive({
      params: Promise.resolve({slug: 'nextjs'})
    } as any)

    render(Component)
    expect(
      screen.getByRole('heading', {name: /Post Tag: nextjs/i})
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
      .spyOn(getTagBySlugModule, 'default')
      .mockResolvedValue(null as any)

    await expect(
      TagArchive({params: Promise.resolve({slug: 'empty'})} as any)
    ).rejects.toThrow('not found')
    spy.mockRestore()
  })
})
