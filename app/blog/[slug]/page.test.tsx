import * as getAllPostsModule from '@/lib/queries/getAllPosts'
import * as getPostBySlugModule from '@/lib/queries/getPostBySlug'
import {render, screen} from '@/test-utils'
import type {Metadata} from 'next'
import Post, {generateMetadata, generateStaticParams} from './page'
// Mock notFound to throw, matching Next.js behavior in runtime
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found')
  }
}))

describe('app/blog/[slug]/page (Server Component)', () => {
  // No network mocking needed; we stub query functions directly

  const examplePost = {
    databaseId: 101,
    slug: 'hello-world',
    title: 'Hello <em>World</em>',
    excerpt: '<p>Excerpt</p>',
    content: '<p>Content</p>',
    date: '2024-01-01',
    author: {node: {name: 'Greg'}},
    seo: {title: 'SEO Title', metaDesc: 'SEO Desc'},
    categories: {
      nodes: [{databaseId: 1, name: 'Tech'}]
    },
    tags: {
      nodes: [{databaseId: 2, name: 'Next.js'}]
    },
    comments: {
      nodes: [
        {
          databaseId: 501,
          content: '<p>Nice post!</p>',
          date: '2024-01-02',
          author: {
            node: {name: 'Alice', avatar: {url: 'https://example.com/a.png'}}
          }
        }
      ]
    }
  }

  it('generateStaticParams returns slugs from getAllPosts()', async () => {
    // Spy on query function to avoid needing real MSW data shape here
    const spy = vi
      .spyOn(getAllPostsModule, 'default')
      .mockResolvedValue([
        {slug: 'hello-world'},
        {slug: null},
        {slug: 'another-post'}
      ] as any)

    const params = await generateStaticParams()
    expect(params).toEqual([{slug: 'hello-world'}, {slug: 'another-post'}])
    spy.mockRestore()
  })

  it('generateMetadata returns SEO fields for a post', async () => {
    const spy = vi
      .spyOn(getPostBySlugModule, 'default')
      .mockResolvedValue(examplePost as any)

    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'hello-world'})
    } as any)) as Metadata

    expect(meta).toMatchObject({
      title: 'SEO Title',
      description: 'SEO Desc'
    })

    spy.mockRestore()
  })

  it('generateMetadata returns empty object when post not found', async () => {
    const spy = vi
      .spyOn(getPostBySlugModule, 'default')
      .mockResolvedValue(null as any)
    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'missing'})
    } as any)) as Metadata
    expect(meta).toEqual({})
    spy.mockRestore()
  })

  it('renders blog post with categories, tags, and comments', async () => {
    const spy = vi
      .spyOn(getPostBySlugModule, 'default')
      .mockResolvedValue(examplePost as any)

    const Component = await Post({
      params: Promise.resolve({slug: 'hello-world'})
    } as any)

    const {container} = render(Component)
    expect(container).toBeInTheDocument()
    expect(screen.getByRole('heading', {level: 2})).toHaveTextContent(
      'Hello World'
    )
    expect(screen.getByText(/By Greg/i)).toBeInTheDocument()

    // Categories
    expect(
      screen.getByRole('heading', {name: /Categories/i})
    ).toBeInTheDocument()
    expect(screen.getByRole('link', {name: 'Tech'})).toHaveAttribute(
      'href',
      '/blog/category/Tech'
    )

    // Tags
    expect(screen.getByRole('heading', {name: /Tags/i})).toBeInTheDocument()
    expect(screen.getByRole('link', {name: 'Next.js'})).toHaveAttribute(
      'href',
      '/blog/tag/Next.js'
    )

    // Comment content present
    expect(screen.getByText(/Nice post!/i)).toBeInTheDocument()
    spy.mockRestore()
  })

  it('throws via notFound() when post is missing', async () => {
    const spy = vi
      .spyOn(getPostBySlugModule, 'default')
      .mockResolvedValue(null as any)

    await expect(
      Post({params: Promise.resolve({slug: 'missing'})} as any)
    ).rejects.toThrow('not found')
    spy.mockRestore()
  })
})
