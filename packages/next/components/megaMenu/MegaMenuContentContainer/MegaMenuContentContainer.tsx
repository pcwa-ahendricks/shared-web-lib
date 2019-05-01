import React from 'react'
import {Theme} from '@material-ui/core/styles'
import injectStyles from 'react-jss'
import {Paper} from '@material-ui/core'
import ReactCSSTransitionReplace from 'react-css-transition-replace'

type Props = {
  classes: any
  children: React.ReactNode
  crossFadeDuration?: number
}

const DEFAULT_CROSS_FADE_DURATION = 250

const styles: any = (theme: Theme) => ({
  root: {
    zIndex: 10
  },
  paper: {
    width: '100vw',
    minHeight: '30vh',
    backgroundColor: theme.palette.primary.dark
  },
  trans: {
    '& .cross-fade-leave': {
      opacity: 1
    },
    '& .cross-fade-leave.cross-fade-leave-active': {
      opacity: 0,
      transition: ({crossFadeDuration}: {crossFadeDuration: number}) =>
        `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-enter': {
      opacity: 0
    },
    '& .cross-fade-enter.cross-fade-enter-active': {
      opacity: 1,
      transition: ({crossFadeDuration}: {crossFadeDuration: number}) =>
        `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-height': {
      transition: ({crossFadeDuration}: {crossFadeDuration: number}) =>
        `height ${crossFadeDuration}ms ease-in-out`
    }
  }
})

const MegaMenuContentContainer = ({
  classes,
  crossFadeDuration = DEFAULT_CROSS_FADE_DURATION,
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

export default injectStyles(styles)(MegaMenuContentContainer)
