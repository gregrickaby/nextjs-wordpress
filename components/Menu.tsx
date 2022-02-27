import {useWordPressContext} from './WordpressProvider'

export default function Menu() {
  const {data} = useWordPressContext()

  return (
    <nav>
      <ul className="flex space-x-8">
        {data?.menuItems?.edges?.map((menu, index) => (
          <li key={index}>
            <a href={menu?.node?.path}>{menu?.node?.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
