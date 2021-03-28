import cn from 'classnames'

/**
 * The core paragraph block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The Image Block.
 */
export default function BlockParagraph(attributes) {
  return (
    <>
      {!!attributes && (
        <p
          className={cn(attributes?.className)}
          dangerouslySetInnerHTML={{__html: attributes?.content}}
        />
      )}
    </>
  )
}
