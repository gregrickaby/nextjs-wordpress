import Link from 'next/link'
import {MenuItemFields} from '~/lib/types'
import {useWordPressContext} from './WordPressProvider'

/**
 * Header component.
 */
export default function Header() {
  const {headerMenu, generalSettings} = useWordPressContext()

  return (
    <header>
      <div>
        <h1>
          <Link href="/" prefetch={false}>
            <a>{generalSettings?.title}</a>
          </Link>
        </h1>
        <aside>{generalSettings?.description}</aside>
      </div>
      <nav>
        <ul>
          {headerMenu?.menuItems?.nodes?.map(
            (menu: MenuItemFields, index: number) => (
              <li key={index}>
                <Link href={menu?.path}>
                  <a>{menu?.label}</a>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}
