import {gql, useQuery} from '@apollo/client'

/**
 * The primary menu.
 *
 * @author Greg Rickaby
 * @returns {Element} The Primary Menu.
 */
export default function MenuPrimary() {
  const GET_PRIMARY_MENU = gql`
    query MenuQuery {
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

  const {loading, error, data} = useQuery(GET_PRIMARY_MENU)

  const menus = data?.menu?.menuItems?.edges

  if (error) return `Error! ${error.message}`

  return (
    <navigation>
      <ul>
        {!!menus.length &&
          menus.map((menu, index) => (
            <li key={index}>
              <a href={menu?.node?.url}>{menu?.node?.label}</a>
            </li>
          ))}
      </ul>
    </navigation>
  )
}
