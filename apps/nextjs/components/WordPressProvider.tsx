import {createContext, useContext} from 'react'

export interface WordPressContextProps {
  footerMenu: any
  generalSettings: any
  headerMenu: any
}

// Create the WordPressContext.
const WordPressContext = createContext({} as WordPressContextProps)

// Create useWordPressContext hook.
export function useWordPressContext() {
  return useContext(WordPressContext)
}

/**
 * WordPressProvider component.
 */
export default function WordPressProvider({
  children,
  footerMenu,
  generalSettings,
  headerMenu
}) {
  return (
    <WordPressContext.Provider
      value={{
        footerMenu,
        generalSettings,
        headerMenu
      }}
    >
      {children}
    </WordPressContext.Provider>
  )
}
