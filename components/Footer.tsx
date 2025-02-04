/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer className="border-t-2 p-8 text-center text-sm">
      &copy; 2022-{new Date().getFullYear()} - Next.js WordPress by{' '}
      <a href="https://gregrickaby.com">Greg Rickaby</a>
    </footer>
  )
}
