import React, {forwardRef} from 'react'
import {Slide, Zoom} from '@material-ui/core'
import {TransitionProps} from '@material-ui/core/transitions'

// Specifying Prop Types is necessary; Typescript will error in <Dialog/> due to expected TransitionComponent type.

const SlideTransition = forwardRef<unknown, TransitionProps>((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
))
SlideTransition.displayName = 'Transition'

const ZoomTransition = forwardRef<unknown, TransitionProps>((props, ref) => (
  <Zoom ref={ref} {...props} />
))
ZoomTransition.displayName = 'Transition'

export {SlideTransition, ZoomTransition}
