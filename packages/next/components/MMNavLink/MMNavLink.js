// @flow
import React, {type Node} from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Link, Typography as Type} from '@material-ui/core'
import NextLink from 'next/link'
import Router from 'next/router'

type Props = {
  classes: any,
  children: Node,
  href: string
}

const styles = (theme) => ({
  text: {
    color: theme.palette.grey[50],
    opacity: '0.85'
  }
})

const mouseEnterHandler = (href: string) => () => {
  // Only works in production.
  Router.prefetch(href)
}

const MMNavLink = ({classes, children, href}: Props) => {
  return (
    <Type className={classes.text}>
      <NextLink href={href} passHref>
        <Link
          color="inherit"
          underline="none"
          onMouseEnter={mouseEnterHandler(href)}
        >
          {children}
        </Link>
      </NextLink>
    </Type>
  )
}

export default withStyles(styles)(MMNavLink)
