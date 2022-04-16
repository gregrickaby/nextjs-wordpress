import parseContent from '~/lib/parseContent'
import {ArticleProps} from '~/lib/types'

export default function Card({content}: ArticleProps) {
  return (
    <div>
      <h2>
        <a href={content?.uri}>{content?.title}</a>
      </h2>
      {parseContent(content?.content || content?.excerpt)}
    </div>
  )
}
