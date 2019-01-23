// @flow
import React, {type Node} from 'react'
import injectStyles from 'react-jss'
import {Paper} from '@material-ui/core'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

type Props = {
  classes: any,
  crossFadeDuration: number,
  children: Node
}

const DEFAULT_CROSS_FADE_DURATION = 200

const styles = (theme) => ({
  root: {
    zIndex: 10
  },
  paper: {
    width: '100vw',
    minHeight: '30vh',
    background: {
      color: theme.palette.primary.dark
    }
  },
  trans: {
    '& .cross-fade-leave': {
      opacity: 1
    },
    '& .cross-fade-leave.cross-fade-leave-active': {
      opacity: 0,
      transition: ({crossFadeDuration}) =>
        `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-enter': {
      opacity: 0
    },
    '& .cross-fade-enter.cross-fade-enter-active': {
      opacity: 1,
      transition: ({crossFadeDuration}) =>
        `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-height': {
      transition: ({crossFadeDuration}) =>
        `height ${crossFadeDuration}ms ease-in-out`
    }
  }
})

const MegaMenuContentContainer = ({
  classes,
  crossFadeDuration,
  children
}: Props) => {
  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <ReactCSSTransitionReplace
          className={classes.trans}
          transitionName="cross-fade"
          transitionEnterTimeout={crossFadeDuration}
          transitionLeaveTimeout={crossFadeDuration}
        >
          {children}
        </ReactCSSTransitionReplace>
      </Paper>
    </div>
  )
}

MegaMenuContentContainer.defaultProps = {
  crossFadeDuration: DEFAULT_CROSS_FADE_DURATION
}

export default injectStyles(styles)(MegaMenuContentContainer)
