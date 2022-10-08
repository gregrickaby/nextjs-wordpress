import Link from 'next/link'
import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'

export interface FooterProps {
  menu: MenuFields
  settings: SettingsFields
}

/**
 * Footer component.
 */
export default function Footer({settings, menu}: FooterProps) {
  return (
    <footer>
      <ul>
        {menu?.menuItems?.nodes?.map((menu: MenuItemFields, index: number) => (
          <li key={index}>
            <Link href={menu?.path}>
              <a>{menu?.label}</a>
            </Link>
          </li>
        ))}
      </ul>
      &copy; {new Date().getFullYear()} - {settings?.title} -{' '}
      {settings?.description}
    </footer>
  )
}
