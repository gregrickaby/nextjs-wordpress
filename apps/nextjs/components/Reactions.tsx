import {Button, createStyles} from '@mantine/core'
import {IconHeart, IconThumbDown, IconThumbUp} from '@tabler/icons-react'
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

const useStyles = createStyles((theme) => ({
  reactions: {
    display: 'flex',
    justifyContent: 'center'
  },

  button: {
    marginRight: theme.spacing.lg,

    '&:last-child': {
      marginRight: 0
    }
  }
}))

/**
 * Reactions component.
 */
export default function Reactions({postId, reactions}: ReactionsProps) {
  const {classes} = useStyles()
  const [postReactions, setPostReactions] = useState(reactions)
  const [loading, setLoading] = useState('')

  /**
   * Increment the number of reactions.
   */
  async function incrementReaction(name: string, total: number) {
    setLoading(name)
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
    } finally {
      setLoading('')
    }
  }

  return (
    <div className={classes.reactions}>
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
            <Button
              aria-label={label}
              className={classes.button}
              key={index}
              leftIcon={Icons.find((icon) => icon.label === label)?.icon}
              loading={loading === label ? true : false}
              onClick={() => incrementReaction(label, total)}
              type="button"
            >
              {total >= 1 ? total : 0}
            </Button>
          )
        })}
    </div>
  )
}
