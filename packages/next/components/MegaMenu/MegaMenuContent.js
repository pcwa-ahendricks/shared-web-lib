// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Paper} from '@material-ui/core'

type Props = {
  classes: any
}

const styles = (theme) => ({
  root: {
    zIndex: 50
  },
  paper: {
    width: '100vw',
    minHeight: '10vh',
    background: {
      color: theme.palette.primary.dark
    }
  }
})

const MegaMenu = ({classes}: Props) => {
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        I am a mega menu
      </Paper>
    </div>
  )
}

export default withStyles(styles)(MegaMenu)
