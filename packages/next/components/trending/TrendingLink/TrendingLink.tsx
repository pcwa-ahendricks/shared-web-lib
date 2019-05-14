import React, {useCallback} from 'react'
import {Button} from '@material-ui/core'
import {withStyles, createStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import {useRouter} from 'next/router'

type Props = {
  classes: any
  children: React.ReactNode
  href: string
}

const styles = createStyles({
  root: {},
  // Responsive font size for links. Small size defaults to 0.8125rem.
  '@media screen and (max-width: 700px)': {
    root: {
      fontSize: '0.70rem'
    }
  },
  label: {
    whiteSpace: 'nowrap'
  }
})

const TrendingLink = ({classes, children, href}: Props) => {
  const router = useRouter()

  const mouseEnterHandler = useCallback(
    (href: string) => () => {
      // Only works in production mode.
      if (href && href.trim() !== '#') {
        router.prefetch(href)
      }
    },
    [router]
  )
  return (
    <Link href={href} passHref>
      <Button
        size="small"
        color="inherit"
        className={classes.root}
        classes={{label: classes.label}}
        onMouseEnter={mouseEnterHandler(href)}
      >
        {children}
      </Button>
    </Link>
  )
}

export default withStyles(styles)(TrendingLink)
