import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'
import Link from "next/link";

export interface FooterProps {
  menu: MenuFields
  settings: SettingsFields
}

/**
 * Footer component.
 */
export default function Footer({settings, menu}: FooterProps) {
  return (
    <footer className="border-t-2 pt-8 text-center lg:text-base">
      <ul className="flex justify-center space-x-4 lg:m-0">
        {menu?.menuItems?.nodes?.map(
          (menu: MenuItemFields, index: number) => (
            <li className="list-none pb-4  leading-none lg:m-0" key={index}>
              <Link href={menu?.path}>
                <a className="lg:text-lg">{menu?.label}</a>
              </Link>
            </li>
          )
        )}
      </ul>
      &copy; {new Date().getFullYear()} - {settings?.title} - {settings?.description}
    </footer>
  )
}
