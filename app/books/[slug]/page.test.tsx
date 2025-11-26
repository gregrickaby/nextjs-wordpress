import * as getAllBooksModule from '@/lib/queries/getAllBooks'
import * as getBookBySlugModule from '@/lib/queries/getBookBySlug'
import {render, screen} from '@/test-utils'
import type {Metadata} from 'next'
import Book, {generateMetadata, generateStaticParams} from './page'
vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('not found')
  }
}))

describe('app/books/[slug]/page (Server Component)', () => {
  // Network mocking not required; stub query function instead

  const exampleBook = {
    databaseId: 202,
    slug: 'clean-code',
    title: 'Clean <strong>Code</strong>',
    content: '<p>Book content</p>',
    seo: {title: 'Book SEO', metaDesc: 'Book Desc'},
    bookFields: {affiliateUrl: 'https://amazon.example/clean-code'}
  }

  it('generateStaticParams returns slugs from getAllBooks()', async () => {
    const spy = vi
      .spyOn(getAllBooksModule, 'default')
      .mockResolvedValue([
        {slug: 'clean-code'},
        {slug: null},
        {slug: 'refactoring'}
      ] as any)

    const params = await generateStaticParams()
    expect(params).toEqual([{slug: 'clean-code'}, {slug: 'refactoring'}])
    spy.mockRestore()
  })

  it('generateMetadata returns SEO for a book', async () => {
    const spy = vi
      .spyOn(getBookBySlugModule, 'default')
      .mockResolvedValue(exampleBook as any)
    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'clean-code'})
    } as any)) as Metadata
    expect(meta).toMatchObject({title: 'Book SEO', description: 'Book Desc'})
    spy.mockRestore()
  })

  it('generateMetadata returns empty object when book not found', async () => {
    const spy = vi
      .spyOn(getBookBySlugModule, 'default')
      .mockResolvedValue(null as any)
    const meta = (await generateMetadata({
      params: Promise.resolve({slug: 'missing'})
    } as any)) as Metadata
    expect(meta).toEqual({})
    spy.mockRestore()
  })

  it('renders book page with affiliate link', async () => {
    const spy = vi
      .spyOn(getBookBySlugModule, 'default')
      .mockResolvedValue(exampleBook as any)

    const Component = await Book({
      params: Promise.resolve({slug: 'clean-code'})
    } as any)

    render(Component)
    expect(screen.getByRole('heading', {level: 1})).toHaveTextContent(
      'Clean Code'
    )
    const link = screen.getByRole('link', {name: /View on Amazon/i})
    expect(link).toHaveAttribute('href', 'https://amazon.example/clean-code')
    spy.mockRestore()
  })

  it('throws via notFound() when book is missing', async () => {
    const spy = vi
      .spyOn(getBookBySlugModule, 'default')
      .mockResolvedValue(null as any)

    await expect(
      Book({params: Promise.resolve({slug: 'missing'})} as any)
    ).rejects.toThrow('not found')
    spy.mockRestore()
  })
})
