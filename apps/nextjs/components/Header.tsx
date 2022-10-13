import {
  Burger,
  createStyles,
  Drawer,
  Group,
  Menu,
  Text,
  Title
} from '@mantine/core'
import {useDisclosure} from '@mantine/hooks'
import {IconChevronDown} from '@tabler/icons'
import ParseContent from '~/components/ParseContent'
import {useWordPressContext} from '~/components/WordPressProvider'
import {flatListToHierarchical} from '~/lib/helpers'
import {MenuItemFields} from '~/lib/types'

const useStyles = createStyles((theme) => ({
  header: {
    height: 64
  },

  inner: {
    alignItems: 'center',
    display: 'flex',
    height: 64,
    justifyContent: 'space-between'
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    padding: '8px 12px'
  },

  linkLabel: {
    marginRight: 5
  },

  dropdown: {
    border: 0,
    borderRadius: 0
  }
}))

/**
 * Header component.
 */
export default function Header() {
  const {classes} = useStyles()
  const {headerMenu, generalSettings} = useWordPressContext()
  const [opened, {toggle}] = useDisclosure(false)

  // Convert flat list to hierarchical list.
  const menuData = flatListToHierarchical(headerMenu?.menuItems?.nodes ?? [])

  // Loop over all menu items.
  const menuItems = menuData.map((parent) => {
    // If there is a child item...
    if (parent?.childItems?.nodes?.length > 0) {
      // Loop over all child items.
      const dropdownItems = parent.childItems.nodes.map(
        (child: MenuItemFields) => {
          return (
            <Menu.Item key={child.id} component="a">
              <a href={child.path} className={classes.link}>
                {child.label}
              </a>
            </Menu.Item>
          )
        }
      )

      // Build the parent item and its dropdown.
      return (
        <Menu key={parent.id} exitTransitionDuration={0} position="bottom-end">
          <Menu.Target>
            <span className={classes.link}>
              <span className={classes.linkLabel}>{parent.label}</span>
              <IconChevronDown size={12} stroke={1.5} />
            </span>
          </Menu.Target>
          <Menu.Dropdown className={classes.dropdown}>
            {dropdownItems}
          </Menu.Dropdown>
        </Menu>
      )
    }

    // Return a parent/single menu item.
    return (
      <a key={parent.id} href={parent.path} className={classes.link}>
        {parent.label}
      </a>
    )
  })

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Title order={1} size="h2">
            <a href="/">{ParseContent(generalSettings.title)}</a>
          </Title>
          <Text>{ParseContent(generalSettings.description)}</Text>
        </Group>
        <Group spacing={5} className={classes.links}>
          {menuItems}
        </Group>
        <Burger opened={opened} onClick={toggle} className={classes.burger} />
        <Drawer
          className={classes.drawer}
          onClose={toggle}
          opened={opened}
          padding="md"
          position="right"
          title="Menu"
        >
          {menuItems}
        </Drawer>
      </div>
    </header>
  )
}
