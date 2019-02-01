// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import Router from 'next/router'

type Props = {
  classes: any,
  children: Node,
  href: string
}

const styles = {
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
}

const mouseEnterHandler = (href: string) => () => {
  Router.prefetch(href)
}

const TrendingLink = ({classes, children, href}: Props) => {
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
