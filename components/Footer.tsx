import config from '@/lib/config'

/**
 * Footer component.
 */
export default function Footer() {
  return (
    <footer className="border-t-2 p-8 text-center text-sm">
      &copy; 2022-{new Date().getFullYear()} - {config.siteName} by{' '}
      <a href="https://gregrickaby.com">Greg Rickaby</a> |{' '}
      <a href="https://github.com/gregrickaby/nextjs-wordpress">Github</a>
    </footer>
  )
}
