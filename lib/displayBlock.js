import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'

const BlockImage = dynamic(() => import('@/components/BlockImage'))
const BlockParagraph = dynamic(() => import('@/components/BlockParagraph'))
const BlockHeading = dynamic(() => import('@/components/BlockHeading'))
const BlockColumns = dynamic(() => import('@/components/BlockColumns'))

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
    case 'core/paragraph':
      return <BlockParagraph {...attributes} key={index} />
    case 'core/image':
      return <BlockImage {...attributes} key={index} />
    case 'core/heading':
      return <BlockHeading {...attributes} key={index} />
    case 'core/columns':
      return (
        <BlockColumns
          columns={attributes}
          innerBlocks={innerBlocks}
          key={index}
        />
      )

    default:
    //return <pre key={index}>{JSON.stringify(block, null, 2)}</pre>
  }
}

displayBlock.propTypes = {
  block: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
