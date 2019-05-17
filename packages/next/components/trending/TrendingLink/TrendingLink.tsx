import React, {useCallback} from 'react'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/styles'
import Link from 'next/link'
import {useRouter} from 'next/router'

type Props = {
  children: React.ReactNode
  href: string
}

const useStyles = makeStyles({
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

const TrendingLink = ({children, href}: Props) => {
  const router = useRouter()
  const classes = useStyles()

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

export default TrendingLink
