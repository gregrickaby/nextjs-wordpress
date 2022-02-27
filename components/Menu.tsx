import {gql, useQuery} from '@apollo/client'

export default function Menu() {
  const {loading, error, data} = useQuery(PRIMARY_MENU, {
    variables: {menuName: 'primary'}
  })

  if (loading) return <></>
  if (error) return <p>There was an issue loading the menu.</p>

  const menus = data?.menu?.menuItems?.edges

  return (
    <nav>
      <ul className="flex space-x-8">
        {menus?.map((menu, index) => (
          <li key={index}>
            <a
              href={menu.node.url.replace(
                process.env.NEXT_PUBLIC_WORDPRESS_URL,
                ''
              )}
            >
              {menu.node.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const PRIMARY_MENU = gql`
  query GetPrimaryMenu($menuName: ID!) {
    menu(id: $menuName, idType: NAME) {
      menuItems {
        edges {
          node {
            url
            label
          }
        }
      }
    }
  }
`
