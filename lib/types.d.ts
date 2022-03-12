export interface PageProps {
  data: {
    generalSettings: {
      dateFormat: string
      description: string
      language: string
      timeFormat: string
      title: string
    }
    menu: {
      menuItems: {
        nodes: {
          path: string
          target: string
          label: string
        }
      }
    }
    page?: {
      title: string
      content: string
      description: string
      featuredImage: {
        node: {
          altText: string
          sourceUrl: string
          mediaDetails: {
            height: number
            width: number
          }
        }
      }
      seo: {
        fullHead: string
      }
    }
    post?: {
      title: string
      content: string
      description: string
      featuredImage: {
        node: {
          altText: string
          sourceUrl: string
          mediaDetails: {
            height: number
            width: number
          }
        }
      }
      seo: {
        fullHead: string
      }
    }
    book?: {
      title: string
      description: string
      featuredImage: {
        node: {
          altText: string
          sourceUrl: string
          mediaDetails: {
            height: number
            width: number
          }
        }
      }
      seo: {
        fullHead: string
      }
    }
  }
}
