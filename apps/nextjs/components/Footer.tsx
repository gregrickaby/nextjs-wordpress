import {createStyles, Container, Group, Anchor} from '@mantine/core';
import Link from 'next/link'
import {MenuFields, MenuItemFields, SettingsFields} from '~/lib/types'

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
export default function FooterComponent({settings, menu}: FooterProps) {
  const { classes } = useStyles();
  const items =  menu?.menuItems?.nodes?.map((item: MenuItemFields, index: number)  => (
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
      <Container className={classes.inner}>&copy; {new Date().getFullYear()} - {settings?.title} -{' '}
         {settings?.description}
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
