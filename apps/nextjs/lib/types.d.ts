/** Global Types */

export interface ChildrenProps {
  children: React.ReactNode
}

export interface PageProps {
  data: {
    book?: ContentFields
    generalSettings: SettingsFields
    headerMenu: MenuFields
    footerMenu?: MenuFields
    page?: ContentFields
    post?: ContentFields
    posts?: ArchiveFields
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
    nodes: MenuItemFields[]
  }
}

export interface MenuItemFields {
  databaseId: number
  label: string
  linkRelationship: string
  path: string
  target: string
  childItems: {
    nodes: MenuItemFields
  }
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
  contentType: {
    node: {
      name: string
    }
  }
  date: string
  databaseId: number
  description?: string
  excerpt?: string
  featuredImage: FeaturedImageFields
  postFields?: {
    reactions?: {
      dislike: number
      like: number
      love: number
    }
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
    title: string
    metaDesc: string
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
