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
    <header className="flex content-center justify-between">
      <div className="flex space-x-8">
        <h1 className="lg:m-0 lg:text-xl">
          <Link href="/" prefetch={false}>
            <a>{settings?.title}</a>
          </Link>
        </h1>
        <aside className="lg:text-lg">{settings?.description}</aside>
      </div>
      <nav>
        <ul className="flex space-x-4 lg:m-0">
          {menu?.menuItems?.nodes?.map(
            (menu: MenuItemFields, index: number) => (
              <li className="list-none p-0 leading-none lg:m-0" key={index}>
                <Link href={menu?.path}>
                  <a className="lg:text-lg">{menu?.label}</a>
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  )
}
