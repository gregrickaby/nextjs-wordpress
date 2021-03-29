/**
 * The core image block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The Image Block.
 */
export default function ImageBlock(attributes) {
  return (
    <>
      {!!attributes && (
        <img alt={attributes?.alt} loading="lazy" src={attributes?.url} />
      )}
    </>
  )
}
