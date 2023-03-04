import {Avatar, createStyles, Group, Stack, Text, Title} from '@mantine/core'
import Head from 'next/head'
import Image from 'next/image'
import ParseContent from '~/components/ParseContent'
import Reactions from '~/components/Reactions'
import {ContentFields} from '~/lib/types'

export interface ArticleProps {
  content: ContentFields
}

const useStyles = createStyles((theme) => ({
  article: {
    '& > *': {
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.xl
    }
  },

  heroSection: {
    '& > *': {
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.xl
    }
  },

  heroImage: {
    height: 'auto',
    width: '100%'
  },

  authorIntro: {
    fontFamily: theme.fontFamilyMonospace,
    fontSize: theme.fontSizes.sm,
    lineHeight: 0
  },

  publishedDate: {
    fontFamily: theme.fontFamilyMonospace,
    fontSize: theme.fontSizes.sm
  }
}))

/**
 * Article component.
 */
export default function Article({content}: ArticleProps) {
  const {classes} = useStyles()

  return (
    <>
      <Head>
        <title>{content?.seo?.title}</title>
        {content?.seo?.metaDesc && (
          <meta name="description" content={content.seo.metaDesc} />
        )}
      </Head>

      <article className={classes.article}>
        <header>
          {content?.categories?.edges?.length >= 1 &&
            content.categories.edges.map(({node}) => (
              <Text weight={700} key={node.name}>
                {node.name}
              </Text>
            ))}
          {content.title != 'Homepage' && (
            <Title order={1}>{content.title}</Title>
          )}
        </header>
        <section className={classes.heroSection}>
          {content?.featuredImage && (
            <Image
              alt={content.featuredImage.node.altText}
              className={classes.heroImage}
              src={content.featuredImage.node.sourceUrl}
              height={content.featuredImage.node.mediaDetails.height}
              width={content.featuredImage.node.mediaDetails.width}
              priority
            />
          )}
          {content?.author?.node?.gravatarUrl && (
            <Group align="center" position="apart">
              <Group align="flex-end">
                <Avatar
                  alt={content.author.node.name}
                  size={48}
                  src={content.author.node.gravatarUrl}
                  radius="xl"
                />
                <Stack spacing="xs">
                  <Text className={classes.authorIntro}>Author</Text>
                  <cite>{content.author.node.name}</cite>
                </Stack>
              </Group>
              {content.date && (
                <time className={classes.publishedDate}>
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  }).format(Date.parse(content.date))}
                </time>
              )}
            </Group>
          )}
        </section>
        <main>{ParseContent(content.content)}</main>
        {content?.contentType?.node?.name === 'post' && (
          <aside>
            <Reactions
              reactions={content.postFields.reactions}
              postId={content.databaseId}
            />
          </aside>
        )}
      </article>
    </>
  )
}
