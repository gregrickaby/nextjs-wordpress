import config from '@/lib/config'
import type {MenuItem} from '@/lib/generated'
import getMenuBySlug from '@/lib/queries/getMenuBySlug'
import Link from 'next/link'

/**
 * Header component.
 */
export default async function Header() {
  // Get menu items from WordPress.
  const menu = await getMenuBySlug('header')

  return (
    <header>
      <div>
        <h1 className="mb-0">{config.siteName}</h1>
        <p>{config.siteDescription}</p>
      </div>
      <nav className="flex gap-4">
        {!!menu &&
          menu.menuItems?.edges?.map((item: {node: MenuItem}) => (
            <Link key={item.node.databaseId} href={item.node.uri ?? '#'}>
              {item.node.label ?? ''}
            </Link>
          ))}
      </nav>
    </header>
  )
}
