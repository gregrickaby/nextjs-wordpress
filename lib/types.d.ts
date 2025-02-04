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

export interface Menu {
  menuItems: {
    edges: [
      {
        node: {
          uri: string
          label: string
          databaseId: string
        }
      }
    ]
  }
}

export interface FeaturedImage {
  node: {
    altText: string
    sourceUrl: string
    mediaDetails: {
      height: number
      width: number
    }
  }
}

export interface Menu {
  menuItems: {
    edges: [
      {
        node: {
          uri: string
          label: string
          databaseId: string
        }
      }
    ]
  }
}

export interface Page {
  author: {
    node: {
      avatar: {
        url: string
      }
      name: string
    }
  }
  databaseId: string
  date: string
  modified: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: FeaturedImage
  seo: {
    metaDesc: string
    title: string
  }
}

export interface Post {
  author: {
    node: {
      name: string
      avatar: {
        url: string
      }
    }
  }
  databaseId: string
  date: string
  modified: string
  modified: string
  slug: string
  title: string
  excerpt: string
  content: string
  commentCount: number
  categories: {
    nodes: [
      {
        databaseId: string
        name: string
      }
    ]
  }
  tags: {
    nodes: [
      {
        databaseId: string
        name: string
      }
    ]
  }
  featuredImage: FeaturedImage
  seo: {
    metaDesc: string
    title: string
  }
  comments: {
    nodes: [
      {
        databaseId: string
        content: string
        date: string
        status: string
        author: {
          node: {
            avatar: {
              url: string
            }
            email: string
            name: string
            url: string
          }
        }
      }
    ]
  }
}

export interface Book {
  bookFields: {
    affiliateUrl: string
    isbn: string
  }
  databaseId: string
  date: string
  modified: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: FeaturedImage
  seo: {
    metaDesc: string
    title: string
  }
}

export interface AllPages {
  pages: {
    nodes: Page[]
  }
}

export interface AllPosts {
  posts: {
    nodes: Post[]
  }
}
