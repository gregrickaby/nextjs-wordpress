import {ArticleProps} from '~/components/Article'
import ParseContent from '~/components/ParseContent'

/**
 * Card component.
 */
export default function Card({content}: ArticleProps) {
  return (
    <>
      <h2>
        <a href={content?.uri}>{content?.title}</a>
      </h2>
      {ParseContent(content?.content || content?.excerpt)}
    </>
  )
}
