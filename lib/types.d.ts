export interface PageProps {
  page: {
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
  }
}
