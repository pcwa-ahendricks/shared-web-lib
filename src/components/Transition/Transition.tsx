import React, {forwardRef} from 'react'
import {Slide, Zoom} from '@material-ui/core'
import {TransitionProps} from '@material-ui/core/transitions'

/* THESE DON'T WORK! This is not working due to wrapping <div/>. Slides dialog all way to the top of screen instead of middle. Cannot get this to work with React.Fragment either due to node is null error at runtime. Can't get this to work without specifying children due to type error. */

// Specifying Prop Types is necessary; Typescript will error in <Dialog/> due to expected TransitionComponent type.

const SlideTransition = forwardRef<unknown, TransitionProps>(
  ({children, ...props}, ref) => (
    <Slide direction="up" ref={ref} {...props}>
      <div>{children}</div>
    </Slide>
  )
)
SlideTransition.displayName = 'Transition'

const ZoomTransition = forwardRef<unknown, TransitionProps>(
  ({children, ...props}, ref) => (
    <Zoom ref={ref} {...props}>
      <div>{children}</div>
    </Zoom>
  )
)
ZoomTransition.displayName = 'Transition'

export {SlideTransition, ZoomTransition}
