// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import Link from 'next/link'

type Props = {
  classes: any,
  children: Node,
  href: string
}

const styles = {
  root: {
    fontSize: '0.85rem' // Small size defaults to "0.8125rem" which is a bit too small.
  }
}

const TrendingLink = ({classes, children, href}: Props) => {
  return (
    <Link href={href} passHref>
      <Button size="small" color="inherit" className={classes.root}>
        {children}
      </Button>
    </Link>
  )
}

export default withStyles(styles)(TrendingLink)
