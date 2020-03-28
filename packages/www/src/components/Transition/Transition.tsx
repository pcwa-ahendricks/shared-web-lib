import React, {forwardRef} from 'react'
import {Slide, Zoom} from '@material-ui/core'
import {TransitionProps} from '@material-ui/core/transitions'

// Specifying Prop Types is necessary; Typescript will error in <Dialog/> due to expected TransitionComponent type.

const SlideTransition = forwardRef<unknown, TransitionProps>(
  ({children, ...props}, ref) => (
    <Slide direction="up" ref={ref} {...props}>
      <>{children}</>
    </Slide>
  )
)
SlideTransition.displayName = 'Transition'

const ZoomTransition = forwardRef<unknown, TransitionProps>(
  ({children, ...props}, ref) => (
    <Zoom ref={ref} {...props}>
      <>{children}</>
    </Zoom>
  )
)
ZoomTransition.displayName = 'Transition'

export {SlideTransition, ZoomTransition}
