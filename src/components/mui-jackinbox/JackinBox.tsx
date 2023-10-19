import React, {useCallback, useEffect, useState} from 'react'
import clsx from 'clsx'
import {Name} from './Name'
import {Box, BoxProps} from '@mui/material'

/*
Docs:
  https://animate.style
*/

// const VERSION = '4.1.1'
const PREFIX = 'animate__'

export type JackinBoxProps = {
  children?: React.ReactNode
  animate?: boolean
  name: Name
  hideUntilAnimate?: boolean
  noDisplayUntilAnimate?: boolean
  hideAfterAnimate?: boolean
  noDisplayAfterAnimate?: boolean
  speed?: 'slower' | 'slow' | 'fast' | 'faster' // 3s (or 3x), 2s (or 2x), 800ms (or .8x), 500ms (or .5x)
  delay?: boolean | 1 | 2 | 3 | 4 | 5
  repeat?: boolean | 1 | 2 | 3
  infinite?: boolean
  version?: string
  // prefix?: string
  delayBy?: string // defaults to 1s
  speedBy?: string // defaults to 1s
  repeatBy?: number // defaults to 1
  onAnimateEnd?: (e?: React.AnimationEvent<HTMLElement>) => void
  onAnimateStart?: (e?: React.AnimationEvent<HTMLElement>) => void
} & BoxProps

export default function JackinBox({
  children,
  className: classNameProp,
  animate = true,
  name,
  // version = VERSION,
  prefix = PREFIX,
  hideUntilAnimate = false,
  noDisplayUntilAnimate = false,
  hideAfterAnimate = false,
  noDisplayAfterAnimate = false,
  delayBy = '1s',
  speedBy = '1s',
  repeatBy = 1,
  speed,
  infinite,
  delay: delayProp = false,
  repeat: repeatProp = false,
  onAnimateEnd,
  onAnimateStart,
  sx,
  ...rest
}: JackinBoxProps) {
  const delay = delayProp === true ? 1 : delayProp
  const repeat = repeatProp === true ? 1 : repeatProp
  // Use animate value to determine when the element should be visible
  const [hidden, setHidden] = useState(hideUntilAnimate ? !animate : false)
  const [noDisplay, setNoDisplay] = useState(
    noDisplayUntilAnimate ? !animate : false
  )

  const animateEndHandler = useCallback(
    (e?: React.AnimationEvent<HTMLElement>) => {
      hideAfterAnimate && setHidden(true)
      noDisplayAfterAnimate && setNoDisplay(true)
      onAnimateEnd?.(e)
      // Don't trigger animation end events w/ nested <JackinBox/> children
      e?.stopPropagation()
    },
    [onAnimateEnd, hideAfterAnimate, noDisplayAfterAnimate]
  )

  const [animateStarted, setAnimateStarted] = useState(false)

  useEffect(() => {
    if (animate && !animateStarted) {
      hideUntilAnimate && setHidden(false)
      noDisplayUntilAnimate && setNoDisplay(false)
    }
  }, [animate, hideUntilAnimate, noDisplayUntilAnimate, animateStarted])

  const animateStartHandler = useCallback(
    (e?: React.AnimationEvent<HTMLElement>) => {
      setAnimateStarted(true)
      onAnimateStart?.(e)
      // Don't trigger animation end events w/ nested <JackinBox/> children
      e?.stopPropagation()
    },
    [onAnimateStart]
  )

  return (
    <Box
      className={clsx([
        {
          [`${prefix}animated`]: animate,
          [`${prefix}${name}`]: animate && name,
          [`${prefix}${speed}`]: animate && speed,
          [`${prefix}infinite`]: animate && infinite,
          [`${prefix}repeat-${repeat}`]: animate && repeat,
          [`${prefix}delay-${delay}s`]: animate && delay
        },
        classNameProp
      ])}
      sx={{
        '--animate-delay': delayBy as any,
        '--animate-duration': speedBy as any,
        '--animate-repeat': repeatBy as any,
        // Conditional CSS Properties
        ...(hidden && {
          visibility: 'hidden'
        }),
        ...(noDisplay && {
          display: 'none'
        }),
        ...sx
      }}
      onAnimationEnd={animateEndHandler}
      onAnimationStart={animateStartHandler}
      {...rest}
    >
      {children}
    </Box>
  )
}
