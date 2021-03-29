/**
 * The core heading block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The Heading Block.
 */
export default function HeadingBlock(attributes) {
  if (!attributes) {
    return null
  }

  switch (attributes?.level) {
    case 1:
      return <h1 dangerouslySetInnerHTML={{__html: attributes?.content}} />
    case 2:
      return <h2 dangerouslySetInnerHTML={{__html: attributes?.content}} />
    case 3:
      return <h3 dangerouslySetInnerHTML={{__html: attributes?.content}} />
    case 4:
      return <h4 dangerouslySetInnerHTML={{__html: attributes?.content}} />
    case 5:
      return <h5 dangerouslySetInnerHTML={{__html: attributes?.content}} />
    case 6:
      return <h6 dangerouslySetInnerHTML={{__html: attributes?.content}} />
  }
}
