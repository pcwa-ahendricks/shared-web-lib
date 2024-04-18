import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'
export type AnimateProps = {
  animate?: boolean
  duration?: number
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'both' | 'backwards' | 'forwards' | 'none'
} & BoxProps

const Animate = ({children, delay, animate, ...rest}: AnimateProps) => {
  return <Box {...rest}>{children}</Box>
}

export default Animate
