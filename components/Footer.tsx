/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer className="text-sm text-center border-t-2 p-8">
      &copy; 2022-{new Date().getFullYear()} - Next.js WordPress by{' '}
      <a href="https://gregrickaby.com">Greg Rickaby</a>
    </footer>
  )
}
