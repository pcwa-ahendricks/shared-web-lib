import React from 'react'
import {Slide, Zoom} from '@material-ui/core'
import {TransitionProps} from '@material-ui/core/transitions/transition'

const SlideTransition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  }
)
SlideTransition.displayName = 'Transition'

const ZoomTransition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />
  }
)
ZoomTransition.displayName = 'Transition'

export {SlideTransition, ZoomTransition}
