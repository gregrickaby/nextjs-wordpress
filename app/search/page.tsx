import SearchForm from '@/components/SearchForm'

/**
 * Search page.
 */
export default function Page() {
  return (
    <main className="flex flex-col gap-8">
      <h1>Search</h1>
      <SearchForm />
    </main>
  )
}
