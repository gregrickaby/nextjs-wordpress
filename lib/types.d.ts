/* Global types only */

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

export interface Page {
  author: {
    node: {
      gravatarUrl: string
      name: string
    }
  }
  databaseId: string
  date: string
  slug: string
  title: string
  excerpt: string
  content: string
  featuredImage: {
    node: {
      altText: string
      mediaDetails: {
        sizes: [
          {
            name: string
            sourceUrl: string
            height: number
            width: number
          }
        ]
      }
    }
  }
  seo: {
    metaDesc: string
    title: string
  }
}

export interface Post {
  author: {
    node: {
      gravatarUrl: string
      name: string
    }
  }
  databaseId: string
  date: string
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
  featuredImage: {
    node: {
      altText: string
      mediaDetails: {
        sizes: [
          {
            name: string
            sourceUrl: string
            height: number
            width: number
          }
        ]
      }
    }
  }
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
            email: string
            gravatarUrl: string
            name: string
          }
        }
      }
    ]
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
