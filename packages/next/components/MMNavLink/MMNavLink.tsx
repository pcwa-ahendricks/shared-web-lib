import React from 'react'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import {Typography as Type} from '@material-ui/core'
import Router from 'next/router'
import NextLink from '@components/NextLink/NextLink'

type Props = {
  classes: any
  children: React.ReactNode
  href: string
}

const styles = (theme: Theme) =>
  createStyles({
    text: {
      color: theme.palette.grey[50],
      opacity: 0.85
    }
  })

const MMNavLink = ({classes, children, href}: Props) => {
  return (
    <Type className={classes.text}>
      <NextLink
        href={href}
        color="inherit"
        underline="none"
        onMouseEnter={mouseEnterHandler(href)}
      >
        {children}
      </NextLink>
    </Type>
  )
}

export default withStyles(styles)(MMNavLink)

function mouseEnterHandler(href: string) {
  return () => {
    // Only works in production.
    if (href) {
      Router.prefetch(href)
    }
  }
}
