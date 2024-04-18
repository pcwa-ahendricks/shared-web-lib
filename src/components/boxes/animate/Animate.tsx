import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'
export type AnimateProps = {
  name: string
  animate?: boolean
  duration?: number
  delay?: number
  iterations?: number
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
  fillMode?: 'both' | 'backwards' | 'forwards' | 'none'
} & BoxProps

const Animate = ({
  children,
  delay = 0,
  duration = 500,
  animate = true,
  iterations = 1,
  direction = 'normal',
  fillMode = 'both',
  name,
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  return (
    <Box
      sx={{
        ...(animate && {
          // '-webkit-animation': `${name} ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`,
          animation: `${name} ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`
        }),
        ...sx
      }}
      {...restBoxProps}
    >
      {children}
    </Box>
  )
}

export default Animate
