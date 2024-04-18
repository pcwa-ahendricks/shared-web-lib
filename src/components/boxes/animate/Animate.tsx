import React, {useCallback, useEffect, useState} from 'react'
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
  animationEnded?: boolean
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
  onAnimationStart,
  onAnimationEnd,
  animationEnded: animationEndedParam = false,
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  const animate3dSuffix = animate3d ? '-3d' : ''
  const [animationStarted, setAnimationStarted] = useState(false)
  const [animationEnded, setAnimationEnded] = useState(false)

  const animationStartHandler = useCallback(
    (event) => {
      setAnimationStarted(true)
      // Call the onAnimationStart function passed as a prop, if it exists
      if (onAnimationStart) {
        onAnimationStart(event)
      }
    },
    [onAnimationStart]
  )

  const animationEndHandler = useCallback(
    (event) => {
      setAnimationEnded(true)
      // Call the onAnimationEnd function passed as a prop, if it exists
      if (onAnimationEnd) {
        onAnimationEnd(event)
      }
    },
    [onAnimationEnd]
  )

  // Only start transparent if: User specified, and the animation has not started
  const shouldStartTransparent = transparentUntilAnimate && !animationStarted

  return (
    <Box
      sx={{
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
  )
}

export default Animate
