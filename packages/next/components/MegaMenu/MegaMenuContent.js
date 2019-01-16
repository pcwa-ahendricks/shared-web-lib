// @flow
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Paper, Typography as Type} from '@material-ui/core'

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
  },
  text: {
    color: theme.palette.grey[50],
    opacity: '0.85'
  }
})

const MegaMenu = ({classes}: Props) => {
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Type className={classes.text}>I am a mega menu</Type>
      </Paper>
    </div>
  )
}

export default withStyles(styles)(MegaMenu)
