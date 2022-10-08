import {IconHeart, IconThumbDown, IconThumbUp} from '@tabler/icons'
import {useState} from 'react'

export interface ReactionsProps {
  postId: number
  reactions: {
    like?: number
    dislike?: number
    love?: number
  }
}

const Icons = [
  {
    label: 'like',
    icon: <IconThumbUp />
  },
  {
    label: 'dislike',
    icon: <IconThumbDown />
  },
  {
    label: 'love',
    icon: <IconHeart />
  }
]

/**
 * Reactions component.
 */
export default function Reactions({postId, reactions}: ReactionsProps) {
  const [postReactions, setPostReactions] = useState(reactions)

  /**
   * Increment the number of reactions.
   */
  async function incrementReaction(name: string, total: number) {
    try {
      const response = await fetch(
        `/api/wordpress/reactions?postId=${postId}&reaction=${name}&total=${
          total + 1
        }`,
        {
          method: 'POST'
        }
      )

      if (response.status != 200) {
        throw new Error('Failed to increment reaction.')
      }

      const data = await response.json()

      if ('success' != data.message) {
        throw new Error('Failed to increment reaction.')
      }

      setPostReactions(data?.reactions)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside>
      {!!postReactions &&
        Object.entries(postReactions).map((reaction, index) => {
          // Skip the typename def which comes from GraphQL.
          if (reaction[0] === '__typename') {
            return null
          }

          // Set vars...
          const label = reaction[0]
          const total = reaction[1]

          return (
            <button
              aria-label={label}
              key={index}
              onClick={() => incrementReaction(label, total)}
            >
              {Icons.find((icon) => icon.label === label)?.icon}
              <span>{total >= 1 ? total : 0}</span>
            </button>
          )
        })}
    </aside>
  )
}
