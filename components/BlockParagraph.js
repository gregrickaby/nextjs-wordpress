import cn from 'classnames'

export default function BlockParagraph(attributes) {
  return (
    <>
      <p
        className={cn(attributes?.className)}
        dangerouslySetInnerHTML={{__html: attributes?.content}}
      />
    </>
  )
}
