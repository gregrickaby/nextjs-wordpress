import {gql, useQuery} from '@apollo/client'

export default function PrimaryMenu() {
  const {loading, error, data} = useQuery(PRIMARY_MENU)

  if (loading) return <></>
  if (error) return <p>Error :(</p>

  const menus = data?.menu?.menuItems?.edges

  return (
    <nav>
      <ul>
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
  query GetPrimaryMenu {
    menu(id: "Primary", idType: NAME) {
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
