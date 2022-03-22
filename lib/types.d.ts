export interface PageProps {
  data: {
    generalSettings: SettingsFields
    menu: MenuFields
    page?: ContentFields
    post?: ContentFields
    posts?: ArchiveFields
    book?: ContentFields
  }
}

export interface ArticleProps {
  content: ContentFields
}

export interface CommentProps {
  comments: {
    nodes: CommentFields
  }
  postId: number
  total: number
}

export interface HeaderProps {
  settings: SettingsFields
  menu: MenuFields
}

export interface LayoutProps {
  settings: SettingsFields
  menu: MenuFields
  seo: {
    fullHead: string
  }
  children: any
}

interface SettingsFields {
  dateFormat: string
  description: string
  language: string
  timeFormat: string
  title: string
}

interface MenuFields {
  menuItems: {
    nodes: {
      map: any
      path: string
      target: string
      label: string
    }
  }
}

interface ContentFields {
  commentCount: number
  commentStatus: string
  comments: {
    nodes: CommentFields
  }
  content: string
  databaseId: number
  description?: string
  excerpt?: string
  featuredImage: FeaturedImageFields
  title: string
  uri: string
  seo: {
    fullHead: string
  }
  nodes?: ArchiveFields
  bookFields?: {
    affiliateUrl: string
    isbn: string
  }
}

interface ArchiveFields {
  length: number
  map: any
  title: string
  excerpt: string
  uri: string
  featuredImage: FeaturedImageFields
}

interface FeaturedImageFields {
  node: {
    altText: string
    sourceUrl: string
    mediaDetails: {
      height: number
      width: number
    }
  }
}

interface CommentFields {
  author: {
    node: {
      gravatarUrl: string
      name: string
      url: string
    }
  }
  approved: boolean
  content: string
  databaseId: number
  date: string
  map: any
}
