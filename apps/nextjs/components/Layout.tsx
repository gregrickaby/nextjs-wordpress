import {createStyles} from '@mantine/core'
import Footer from '~/components/Footer'
import Header from '~/components/Header'
import Meta from '~/components/Meta'
import {ChildrenProps} from '~/lib/types'

const useStyles = createStyles((theme) => ({
  container: {
    margin: '0 auto',
    maxWidth: '811px',
    padding: `0 ${theme.spacing.xl}px`,

    '& > *': {
      marginBottom: theme.spacing.xl,
      marginTop: theme.spacing.xl
    }
  }
}))

/**
 * Layout component.
 */
export default function Layout({children}: ChildrenProps) {
  const {classes} = useStyles()

  return (
    <div className={classes.container}>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
