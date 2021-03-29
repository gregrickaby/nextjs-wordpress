import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'

const BlockColumns = dynamic(() => import('@/components/Blocks/BlockColumns'))
const BlockHeading = dynamic(() => import('@/components/Blocks/BlockHeading'))
const BlockImage = dynamic(() => import('@/components/Blocks/BlockImage'))
const BlockList = dynamic(() => import('@/components/Blocks/BlockList'))
const BlockParagraph = dynamic(() =>
  import('@/components/Blocks/BlockParagraph')
)

/**
 * Decide which block component to display.
 *
 * @author Greg Rickaby
 * @param {object} block The block data.
 * @param {number} index A unique key required by React.
 * @return {Element}     A block-based component.
 */
export default function displayBlock(block, index) {
  const {attributes, name, innerBlocks} = block

  switch (name) {
    case 'core/columns':
      return (
        <BlockColumns
          columns={attributes}
          innerBlocks={innerBlocks}
          key={index}
        />
      )
    case 'core/heading':
      return <BlockHeading {...attributes} key={index} />
    case 'core/image':
      return <BlockImage {...attributes} key={index} />
    case 'core/list':
      return <BlockList {...attributes} key={index} />
    case 'core/paragraph':
      return <BlockParagraph {...attributes} key={index} />

    default:
      return <pre key={index}>{JSON.stringify(block, null, 2)}</pre>
  }
}

displayBlock.propTypes = {
  block: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
