import BlockInner from '@/components/Blocks/BlockInner'
import cn from 'classnames'

/**
 * The core columns block.
 *
 * @author Greg Rickaby
 * @param {object} attributes Block attributes as props.
 * @returns {Element}         The Columns Block.
 */
export default function ColumnsBlock({options, innerBlocks}) {
  return (
    <>
      {!!innerBlocks?.length && (
        <div id={options?.anchor} className={cn(`grid`, options?.className)}>
          {innerBlocks.map((block, index) => {
            return (
              <div key={`column-${index}`} className={`column column-${index}`}>
                {!!block?.innerBlocks?.length && (
                  <BlockInner blocks={block.innerBlocks} />
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
