import {gql, useQuery} from '@apollo/client'
import {createContext, useContext} from 'react'

// Create the WordPress Context.
const WordPressContext = createContext(null)

// Create useWordPressContext hook.
export const useWordPressContext = () => useContext(WordPressContext)

export default function WordPressProvider({children}) {
  const data = useQuery(GLOBAL_SETTINGS)

  return (
    <WordPressContext.Provider value={data}>
      {children}
    </WordPressContext.Provider>
  )
}

const GLOBAL_SETTINGS = gql`
  query GetSettings {
    generalSettings {
      dateFormat
      description
      language
      timeFormat
      title
    }
    readingSettings {
      postsPerPage
    }
    menuItems(where: {location: PRIMARY}) {
      edges {
        node {
          path
          target
          label
        }
      }
    }
  }
`
