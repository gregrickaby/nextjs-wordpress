import {ArticleProps} from '~/components/Article'
import ParseContent from '~/components/ParseContent'
import {
  createStyles,
  Card,
  Image,
  Text,
  AspectRatio
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',
    marginTop: '16px',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600
  }
}))

/**
 * Card component.
 */
export default function CardComponent({content}: ArticleProps) {
  const {classes} = useStyles()
  return (
      <Card p="md" radius="md" component="a" href={content?.uri} className={classes.card}>
        <AspectRatio ratio={1920 / 1080}>
          {content.featuredImage ? (<Image
            src={content.featuredImage?.node?.sourceUrl}
            alt={content.featuredImage?.node?.altText}
          />) :  (<Image
            src={'cat.jpeg'}
            alt={'cat'}
          />) }
        </AspectRatio>
        <Text className={classes.title} mt={5}>
          {content?.title}
        </Text>
        <Text
          color="dimmed"
          size="xs"
          transform="uppercase"
          weight={700}
          mt="md"
        >
          {ParseContent(content?.content || content?.excerpt)}
        </Text>
      </Card>
  )
}
