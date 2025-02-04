'use client'

import {searchQuery} from '@/lib/functions'
import {SearchResults} from '@/lib/types'
import Link from 'next/link'
import {useCallback, useEffect, useRef, useState} from 'react'

/**
 * Search component.
 */
export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResults[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Perform the search.
  const performSearch = useCallback(async () => {
    // If the query is empty or too long, return early.
    if (query.length === 0 || query.length > 100) return

    setIsSearching(true)
    setHasSearched(true)

    try {
      const data = await searchQuery(query)
      setResults(data)
    } catch (error) {
      console.error(error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [query])

  // Debounce the search query.
  useEffect(() => {
    if (query.length > 0) {
      const debounceTimeout = setTimeout(performSearch, 500)
      return () => clearTimeout(debounceTimeout)
    } else {
      setResults([])
      setHasSearched(false)
    }
  }, [query, performSearch])

  // Reset the search.
  function resetSearch() {
    setIsSearching(false)
    setQuery('')
    setResults([])
    setHasSearched(false)
  }

  return (
    <>
      <div className="relative flex items-center pb-8">
        <input
          aria-label="Search"
          className="w-full"
          name="search"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Begin typing to search..."
          ref={inputRef}
          type="search"
          value={query}
        />
        <button aria-label="reset search" onClick={resetSearch} type="reset">
          Reset
        </button>
      </div>

      {query.length > 0 && !hasSearched && <p className="m-0">Searching...</p>}
      {!isSearching && hasSearched && results.length === 0 && (
        <p className="m-0">Bummer. No results found.</p>
      )}
      {!isSearching && results.length > 0 && (
        <div className="m-auto">
          <p className="m-0">
            Nice! You found{' '}
            <span className="border-b border-b-orange-300 font-bold">
              {results.length}
            </span>{' '}
            results for{' '}
            <span className="bg-orange-300 p-1 text-zinc-800">{query}</span>
          </p>
          <ol>
            {results.map((result) => (
              <li key={result.id}>
                <Link
                  href={result.url.replace('https://blog.', 'https://')}
                  onClick={resetSearch}
                >
                  <span
                    className="m-0 p-0"
                    dangerouslySetInnerHTML={{__html: result.title}}
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  )
}
