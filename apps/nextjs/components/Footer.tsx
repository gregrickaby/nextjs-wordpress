import {createStyles, Group, Text} from '@mantine/core'
import {useWordPressContext} from '~/components/WordPressProvider'
import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'
import ParseContent from './ParseContent'

export interface FooterProps {
  menu: MenuFields
  settings: SettingsFields
}

const useStyles = createStyles((theme) => ({
  footer: {
    alignItems: 'center',
    borderTop: `1px solid ${theme.colors.gray[3]}`,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xl,
    paddingTop: theme.spacing.xl,

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    }
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.md
    }
  }
}))

/**
 * Footer component.
 */
export default function FooterComponent() {
  const {classes} = useStyles()
  const {footerMenu, generalSettings} = useWordPressContext()

  return (
    <footer className={classes.footer}>
      <Text>
        &copy; 2022-{new Date().getFullYear()} -{' '}
        {ParseContent(generalSettings?.title)}
      </Text>
      <Group className={classes.links}>
        {footerMenu?.menuItems?.nodes?.map((item: MenuItemFields) => (
          <a key={item.id} href={item.path}>
            {item.label}
          </a>
        ))}
      </Group>
    </footer>
  )
}
