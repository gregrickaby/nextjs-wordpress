import Link from 'next/link'
import {MenuItemFields} from '~/lib/types'
import {useWordPressContext} from './WordPressProvider'

/**
 * Footer component.
 */
export default function Footer() {
  const {footerMenu, generalSettings} = useWordPressContext()

  return (
    <footer>
      <ul>
        {footerMenu?.menuItems?.nodes?.map(
          (menu: MenuItemFields, index: number) => (
            <li key={index}>
              <Link href={menu?.path}>
                <a>{menu?.label}</a>
              </Link>
            </li>
          )
        )}
      </ul>
      &copy; {new Date().getFullYear()} - {generalSettings?.title} -{' '}
      {generalSettings?.description}
    </footer>
  )
}
