export interface PageProps {
  data: {
    book?: ContentFields
    generalSettings: SettingsFields
    menu: MenuFields
    page?: ContentFields
    post?: ContentFields
    posts?: ArchiveFields
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
  menu: MenuFields
  settings: SettingsFields
}

export interface LayoutProps {
  children: any
  menu: MenuFields
  settings: SettingsFields
  seo: {
    fullHead: string
  }
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
  bookFields?: {
    affiliateUrl: string
    isbn: string
  }
  categories?: {
    edges: [
      node: {
        node: {
          name: string
          uri: string
        }
      }
    ]
  }
  commentCount?: number
  commentStatus?: string
  comments?: {
    nodes: CommentFields
  }
  content: string
  date: string
  databaseId: number
  description?: string
  excerpt?: string
  featuredImage: FeaturedImageFields
  hearts?: {
    hearts: number
  }
  tags?: {
    edges: [
      node: {
        node: {
          name: string
          uri: string
        }
      }
    ]
  }
  title: string
  uri: string
  seo: {
    fullHead: string
  }
  nodes?: ArchiveFields
}

export interface ArchiveFields {
  excerpt: string
  featuredImage: FeaturedImageFields
  length: number
  map: any
  title: string
  uri: string
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
  parentId: string
}

export interface CommentFormFields {
  authorName: string
  authorEmail: string
  authorUrl: string
  comment: string
  postID: number
}
