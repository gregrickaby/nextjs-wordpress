import {useState} from 'react'
import {FiHeart, FiThumbsDown, FiThumbsUp} from 'react-icons/fi'

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
    icon: <FiThumbsUp />
  },
  {
    label: 'dislike',
    icon: <FiThumbsDown />
  },
  {
    label: 'love',
    icon: <FiHeart />
  }
]

/**
 * Reactions component.
 */
export default function Reactions({postId, reactions}: ReactionsProps) {
  const [postReactions, setPostReactions] = useState(reactions)
  const [animate, setAnimate] = useState({name: '', animate: false})

  /**
   * Increment the number of reactions.
   */
  async function incrementReaction(name: string, total: number) {
    setAnimate({name, animate: true})
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
      setAnimate({name: '', animate: false})
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <aside className="flex space-x-4 md:flex-col md:space-x-0 md:space-y-2">
      {!!postReactions &&
        Object.entries(postReactions).map((reaction, index) => {
          // Skip the typename def which comes from GraphQL.
          if (reaction[0] === '__typename') {
            return null
          }

          // Set vars...
          const label = reaction[0]
          const total = reaction[1]
          const isAnimating =
            !!animate.name && animate.name === label ? 'animate-wiggle' : ''

          return (
            <button
              aria-label={label}
              className={`mt-6 space-y-1 p-2 text-center text-base text-zinc-800 hover:text-green-600 dark:text-white ${isAnimating}`}
              key={index}
              onClick={() => incrementReaction(label, total)}
            >
              {Icons.find((icon) => icon.label === label)?.icon}
              <span className="relative inline-flex">
                {total >= 1 ? total : 0}
              </span>
            </button>
          )
        })}
    </aside>
  )
}
