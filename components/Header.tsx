import Link from 'next/link'
import {HeaderProps} from '~/lib/types'

export default function Header({settings, menu}: HeaderProps) {
  return (
    <header className="flex justify-between">
      <div className="flex space-x-8">
        <h1>
          <Link href="/" prefetch={false}>
            <a>{settings?.title}</a>
          </Link>
        </h1>
        <aside>{settings?.description}</aside>
      </div>
      <nav>
        <ul className="flex space-x-8">
          {menu?.menuItems?.nodes?.map((menu, index: number) => (
            <li key={index}>
              <Link href={menu?.path}>
                <a>{menu?.label}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
