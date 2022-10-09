import {createStyles, Group, Anchor} from '@mantine/core';
import Link from 'next/link'
import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'
import {useWordPressContext} from "~/components/WordPressProvider";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export interface FooterProps {
  menu: MenuFields
  settings: SettingsFields
}

/**
 * Footer component.
 */
export default function FooterComponent() {
  const {footerMenu, generalSettings} = useWordPressContext()
  const { classes } = useStyles();
  const items =  footerMenu?.menuItems?.nodes?.map((item: MenuItemFields, index: number)  => (
    <Link key={index} href={item.path}>
      <Anchor<'a'>
        color="dimmed"
        size="sm"
      >
        {item.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        &copy; {new Date().getFullYear()} - {generalSettings?.title} -{' '}
        {generalSettings?.description}
        <Group className={classes.links}>{items}</Group>
      </div>
    </div>
  );
}
