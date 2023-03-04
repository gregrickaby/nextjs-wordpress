import {MantineThemeOverride} from '@mantine/core'

/**
 * A custom theme to override Mantine
 * defaults and style Gutenberg blocks.
 *
 * @see https://mantine.dev/theming/theme-object/#store-theme-override-object-in-a-variable
 * @see https://mantine.dev/theming/theme-object/#usage
 * @see https://mantine.dev/theming/mantine-provider/#css-variables
 */
export const customTheme: MantineThemeOverride = {
  // Override Mantine defaults.
  fontFamilyMonospace:
    'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
  fontSizes: {
    xs: '0.50rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.5rem'
  },
  headings: {
    sizes: {
      h1: {fontSize: '2rem', lineHeight: 1.2},
      h2: {fontSize: '1.5rem', lineHeight: 1.4},
      h3: {fontSize: '1.125rem', lineHeight: 1.5},
      h4: {fontSize: '1rem', lineHeight: 1.75}
    }
  },
  // Style Gutenberg blocks.
  globalStyles: (theme) => ({
    body: {
      overflowX: 'hidden'
    },

    h1: {
      fontSize: theme.headings.sizes.h1.fontSize,
      lineHeight: theme.headings.sizes.h1.lineHeight
    },

    h2: {
      fontSize: theme.headings.sizes.h2.fontSize,
      lineHeight: theme.headings.sizes.h2.lineHeight
    },

    h3: {
      fontSize: theme.headings.sizes.h3.fontSize,
      lineHeight: theme.headings.sizes.h3.lineHeight
    },

    h4: {
      fontSize: theme.headings.sizes.h4.fontSize,
      lineHeight: theme.headings.sizes.h4.lineHeight
    },

    '.wp-block-image img': {
      height: 'auto',
      maxWidth: '100%',
      verticalAlign: 'bottom'
    },

    '.has-text-align-center': {
      textAlign: 'center'
    },

    '.has-text-align-right': {
      textAlign: 'right'
    },

    '.wp-block-code': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.dark[6],
      borderRadius: `4px`,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[0]
          : theme.colors.dark[0],
      fontFamily: theme.fontFamilyMonospace,
      fontSize: theme.fontSizes.sm,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      overflow: 'auto'
    },

    '.alignright': {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: theme.spacing.xl
    },

    '.alignleft': {
      float: 'left',
      marginInlineEnd: theme.spacing.xl,
      marginInlineStart: 0,
      textAlign: 'left'
    },

    '.aligncenter': {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    },

    '.alignwide': {
      marginLeft: 'calc(25% - 25vw)',
      marginRight: 'calc(25% - 25vw)'
    },

    '.alignfull': {
      marginLeft: 'calc(50% - 50vw)',
      marginRight: 'calc(50% - 50vw)'
    },

    '.wp-block-columns': {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'nowrap',
      gap: theme.spacing.sm,

      [theme.fn.smallerThan('md')]: {
        flexWrap: 'wrap'
      },

      '.wp-block-column': {
        flexBasis: 0,
        flexGrow: 1,

        [theme.fn.smallerThan('sm')]: {
          flexBasis: '100%'
        }
      }
    },

    '.wp-block-embed': {
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: '100%',
      overflowWrap: 'break-word',

      'iframe, object, embed': {
        aspectRatio: '16 / 9',
        height: 'auto',
        width: '100%'
      }
    }
  })
}
