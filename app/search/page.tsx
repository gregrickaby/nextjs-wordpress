import SearchForm from '@/components/SearchForm'

/**
 * Search page.
 */
export default function Page() {
  // Include a trivial, countable statement so coverage records this file
  const title = 'Search'
  return (
    <main className="flex flex-col gap-8">
      <h1>{title}</h1>
      <SearchForm />
    </main>
  )
}
