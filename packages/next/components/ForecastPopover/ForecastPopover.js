// @flow

import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import {Popover} from '@material-ui/core'

const DARKSKY_BG_COLOR = '#313134'

type Props = {
  classes: any,
  onPopoverClose: () => any,
  anchorEl: any
}

const styles = (theme) => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    padding: theme.spacing.unit,
    backgroundColor: DARKSKY_BG_COLOR
  },
  popoverContent: {
    width: 150,
    height: 20,
    background: {
      image: 'url(./static/images/darksky/poweredby-oneline-dark-300.png)',
      repeat: 'no-repeat',
      position: 'center',
      size: 'cover'
    }
  }
})

const ForecastPopover = ({onPopoverClose, classes, anchorEl}: Props) => {
  const open = Boolean(anchorEl)
  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 30,
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      onClose={onPopoverClose}
      disableRestoreFocus
    >
      <div className={classes.popoverContent} />
    </Popover>
  )
}

ForecastPopover.defaultProps = {
  open: false,
  onPopoverClose: () => null,
  anchorEl: null
}

export default withStyles(styles)(ForecastPopover)
