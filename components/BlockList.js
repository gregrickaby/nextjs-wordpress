/**
 * The core list block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The List Block.
 */
export default function BlockList(attributes) {
  return (
    <>
      {attributes?.ordered ? (
        <ol dangerouslySetInnerHTML={{__html: attributes?.values}} />
      ) : (
        <ul dangerouslySetInnerHTML={{__html: attributes?.values}} />
      )}
    </>
  )
}
