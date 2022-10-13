import {Anchor, Button, Card, createStyles, Text} from '@mantine/core'
import Image from 'next/future/image'
import {ArticleProps} from '~/components/Article'
import ParseContent from '~/components/ParseContent'

const useStyles = createStyles((theme) => ({
  featuredImage: {
    aspectRatio: '16/9',
    height: 'auto',
    width: '100%'
  },

  inner: {
    padding: theme.spacing.md
  }
}))

/**
 * Card component.
 */
export default function CardComponent({content}: ArticleProps) {
  const {classes} = useStyles()

  return (
    <Card radius="md" withBorder>
      <Card.Section component="a" href={content.uri}>
        {content.featuredImage && (
          <Image
            alt={content.featuredImage.node.altText}
            className={classes.featuredImage}
            height={content.featuredImage.node.mediaDetails.height}
            priority
            src={content.featuredImage.node.sourceUrl}
            width={content.featuredImage.node.mediaDetails.width}
          />
        )}
      </Card.Section>

      <Card.Section className={classes.inner}>
        <Anchor href={content.uri} weight={500}>
          {content.title}
        </Anchor>
        <Text color="dimmed">
          {ParseContent(content.excerpt || content.content)}
        </Text>

        <Button aria-label="Continue reading" component="a" href={content.uri}>
          Continue Reading
        </Button>
      </Card.Section>
    </Card>
  )
}
