import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Paper, Theme} from '@material-ui/core'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import colorAlpha from 'color-alpha'

type Props = {
  children: React.ReactNode
  crossFadeDuration?: number
}

const DEFAULT_CROSS_FADE_DURATION = 250

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 10
  },
  paper: {
    width: '100vw',
    minHeight: '30vh',
    // backgroundColor: theme.palette.primary.dark // Dark background
    backgroundColor: colorAlpha(theme.palette.background.paper, 0.96) // Light, transparent background
  },
  trans: ({crossFadeDuration}: Partial<Props>) => ({
    '& .cross-fade-leave': {
      opacity: 1
    },
    '& .cross-fade-leave.cross-fade-leave-active': {
      opacity: 0,
      transition: `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-enter': {
      opacity: 0
    },
    '& .cross-fade-enter.cross-fade-enter-active': {
      opacity: 1,
      transition: `opacity ${crossFadeDuration}ms ease-in`
    },
    '& .cross-fade-height': {
      transition: `height ${crossFadeDuration}ms ease-in-out`
    }
  })
}))

const MegaMenuContentContainer = ({
  crossFadeDuration = DEFAULT_CROSS_FADE_DURATION,
  children
}: Props) => {
  const classes = useStyles({crossFadeDuration})
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

export default MegaMenuContentContainer
