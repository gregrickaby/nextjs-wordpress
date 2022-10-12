import {
  Burger,
  createStyles,
  Group,
  Header,
  Paper,
  Transition
} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import Link from 'next/link'
import {useState} from 'react'
import {useWordPressContext} from '~/components/WordPressProvider'
import {MenuItemFields} from '~/lib/types'
import ParseContent from './ParseContent'

const HEADER_HEIGHT = 60
const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1
  },

  title: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  subtitle: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('md')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({
        variant: 'light',
        color: theme.primaryColor
      }).background,
      color: theme.fn.variant({variant: 'light', color: theme.primaryColor})
        .color
    }
  }
}))

/**
 * Header component.
 */
export default function HeaderComponent() {
  const {headerMenu, generalSettings} = useWordPressContext()
  const [opened, {toggle, close}] = useDisclosure(false)
  const {classes, cx} = useStyles()
  const [active, setActive] = useState('')
  const items = headerMenu?.menuItems?.nodes?.map(
    (item: MenuItemFields, index: number) => (
      <Link key={index} href={item?.path}>
        <a
          className={cx(classes.link, {
            [classes.linkActive]: active === item.path
          })}
          onClick={() => {
            setActive(item.path)
            close()
          }}
        >
          {item?.label}
        </a>
      </Link>
    )
  )

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <div className={classes.header}>
        <div className={classes.title}>
          <h3>
            <Link href="/" prefetch={false}>
              <a>{ParseContent(generalSettings?.title)}</a>
            </Link>
          </h3>
          <h4 className={classes.subtitle}>
            {ParseContent(generalSettings?.description)}
          </h4>
        </div>
        <nav>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </nav>
        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </div>
    </Header>
  )
}
