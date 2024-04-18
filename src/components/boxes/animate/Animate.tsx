import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'
export type AnimateProps = {
  name: string
  animate3d?: boolean
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
  animate3d = true,
  name,
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  const animate3dSuffix = animate3d ? '-3d' : ''

  return (
    <Box
      sx={{
        ...(animate && {
          // '-webkit-animation': `${name}${animate3dSuffix} ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`,
          animation: `${name}${animate3dSuffix} ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`
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
