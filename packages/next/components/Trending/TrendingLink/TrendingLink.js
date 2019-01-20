// @flow
import React, {type Node} from 'react'
import {Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

type Props = {
  classes: any,
  children: Node
}

const styles = {
  root: {}
}

const TrendingLink = ({classes, children}: Props) => {
  return (
    <Button size="small" color="inherit" className={classes.root}>
      {children}
    </Button>
  )
}

export default withStyles(styles)(TrendingLink)
