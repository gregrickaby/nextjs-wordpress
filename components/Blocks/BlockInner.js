import displayBlock from '@/lib/displayBlock'

/**
 * The core inner block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The Inner Block.
 */
export default function BlockInner({blocks}) {
  return (
    <>
      {!!blocks?.length &&
        blocks.map((block, index) => {
          return displayBlock(block, index)
        })}
    </>
  )
}
