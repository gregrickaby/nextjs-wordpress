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

export interface SettingsFields {
  dateFormat: string
  description: string
  language: string
  timeFormat: string
  title: string
}

export interface MenuFields {
  menuItems: {
    nodes: MenuItemFields
  }
}

export interface MenuItemFields {
  map: any
  path: string
  target: string
  label: string
}

export interface ContentFields {
  author: {
    node: {
      name: string
      gravatarUrl: string
    }
  }
  commentCount: number
  commentStatus: string
  comments: {
    nodes: CommentFields
  }
  content: string
  date: string
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
  tags: {
    nodes: [
      {
        name: string
        uri: string
      }
    ]
  }
  categories: {
    nodes: [
      {
        name: string
        uri: string
      }
    ]
  }
}

export interface ArchiveFields {
  length: number
  map: any
  title: string
  excerpt: string
  uri: string
  featuredImage: FeaturedImageFields
}

export interface FeaturedImageFields {
  node: {
    altText: string
    sourceUrl: string
    mediaDetails: {
      height: number
      width: number
    }
  }
}

export interface CommentFields {
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

export interface CommentFormFields {
  authorName: string
  authorEmail: string
  authorUrl: string
  comment: string
  postID: number
}
