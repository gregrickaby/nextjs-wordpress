// Re-export WordPress types from generated file
export type {Book, Menu, Page, Post} from './generated'

// Non-WordPress types
export interface DynamicPageProps {
  params: Promise<{
    slug: string
  }>
}

export interface SearchResults {
  id: number
  title: string
  url: string
  type: string
  subtype: string
}

export interface Children {
  children: React.ReactNode
}

export interface GraphQLResponse<T = any> {
  data?: T
  errors?: Array<{message: string}>
}
