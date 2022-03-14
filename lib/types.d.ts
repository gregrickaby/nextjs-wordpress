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
      path: string
      target: string
      label: string
    }
  }
}

interface ContentFields {
  title: string
  content: string
  description: string
  featuredImage: FeaturedImageFields
  seo: {
    fullHead: string
  }
}

interface ArchiveFields {
  nodes: [
    {
      title: string
      excerpt: string
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
    }
  ]
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
