import BlockParagraph from '@/components/BlockParagraph'
import PropTypes from 'prop-types'

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

    default:
      return <pre key={index}>{JSON.stringify(block, null, 2)}</pre>
  }
}

displayBlock.propTypes = {
  block: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
