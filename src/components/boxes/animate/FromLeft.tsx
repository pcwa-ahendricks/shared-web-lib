import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

const FromLeft = ({
  children,
  delay = 0,
  animate = true,
  ...rest
}: {animate?: boolean; delay?: number} & BoxProps) => {
  const {sx, ...restBoxProps} = rest
  return (
    <Box
      sx={{
        ...(animate && {
          '-webkit-animation': `slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`,
          animation: `slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`
        }),
        ...sx
      }}
      {...restBoxProps}
    >
      {children}
    </Box>
  )
}

export default FromLeft
