import Link from 'next/link'
import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'

export interface HeaderProps {
  menu: MenuFields
  settings: SettingsFields
}

/**
 * Header component.
 */
export default function Header({settings, menu}: HeaderProps) {
  return (
    <header>
      <div>
        <h1>
          <Link href="/" prefetch={false}>
            <a>{settings?.title}</a>
          </Link>
        </h1>
        <aside>{settings?.description}</aside>
      </div>
      <nav>
        <ul>
          {menu?.menuItems?.nodes?.map(
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
