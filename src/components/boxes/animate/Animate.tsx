import React, {useCallback, useState} from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'
export type AnimateProps = {
  name: string
  easingFunc: string
  animate3d?: boolean
  animate?: boolean
  duration?: number
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'both' | 'backwards' | 'forwards' | 'none'
  transparentUntilAnimate?: boolean
  hiddenUntilAnimate?: boolean
  animationEnded?: boolean
  speed?: 'fast' | 'faster' | 'fastest' | 'slow' | 'slower' | 'slowest'
  ContainerProps?: BoxProps
} & BoxProps

const Animate = ({
  children,
  easingFunc,
  delay = 0,
  duration = 500,
  animate = true,
  iterations = 1,
  direction = 'normal',
  fillMode = 'both',
  animate3d = false, // some components won't use translate
  name,
  transparentUntilAnimate = false,
  hiddenUntilAnimate = false,
  onAnimationStart,
  onAnimationEnd,
  animationEnded: animationEndedParam = false,
  speed,
  ContainerProps,
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  const animate3dSuffix = animate3d ? '-3d' : ''
  const [animationStarted, setAnimationStarted] = useState(false)
  const [_animationEnded, setAnimationEnded] = useState(false)

  if (speed) {
    switch (speed) {
      case 'slowest':
        duration = duration + duration * 0.8
        break
      case 'slower':
        duration = duration + duration * 0.6
        break
      case 'slow':
        duration = duration + duration * 0.4
        break
      case 'fast':
        duration = duration - duration * 0.4
        break
      case 'faster':
        duration = duration - duration * 0.6
        break
      case 'fastest':
        duration = duration - duration * 0.8
        break
      // default:
      // console.log('Invalid speed');
    }
  }

  const animationStartHandler = useCallback(
    (event) => {
      setAnimationStarted(true)
      // Call the onAnimationStart function passed as a prop, if it exists
      onAnimationStart?.(event)
      // Don't trigger animation end events w/ nested animation components
      event?.stopPropagation()
    },
    [onAnimationStart]
  )

  const animationEndHandler = useCallback(
    (event) => {
      setAnimationEnded(true)
      // Call the onAnimationEnd function passed as a prop, if it exists
      onAnimationEnd?.(event)
      // Don't trigger animation end events w/ nested animation components
      event?.stopPropagation()
    },
    [onAnimationEnd]
  )

  // Only start transparent if: User specified, and the animation has not started
  const shouldStartTransparent = transparentUntilAnimate && !animationStarted

  // Only start transparent if: User specified, and the animation has not started
  const shouldStartHidden = hiddenUntilAnimate && !animationStarted

  const {sx: sxContainerProps, ...restContainerProps} = ContainerProps || {}

  return (
    <Box
      sx={{
        perspective: 500,
        perspectiveOrigin: 'calc(50% + 120px) 50%',
        /*  This setting will break backdrop-filter, as in <StationInfo/>. It's unclear when this is actually needed
            so leave it commented out until it's better understood. Note, it doesn't appear to be used on the animista.net website.
        */
        // transformStyle: 'preserve-3d'
        ...sxContainerProps
      }}
      {...restContainerProps}
    >
      <Box
        sx={{
          ...(shouldStartHidden && {
            visibility: 'hidden'
          }),
          ...(shouldStartTransparent && {
            opacity: 0
          }),
          ...(animate && {
            animation: `${name}${animate3dSuffix} ${duration}ms ${easingFunc} ${delay}ms ${iterations} ${direction} ${fillMode}`
          }),
          ...sx
        }}
        onAnimationStart={animationStartHandler}
        onAnimationEnd={animationEndHandler}
        {...restBoxProps}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Animate
