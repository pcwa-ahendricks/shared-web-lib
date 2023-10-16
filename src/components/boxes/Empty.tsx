import React from 'react'
import {Box, BoxProps} from '@mui/material'

export default function Empty({children, ...rest}: BoxProps) {
  return (
    <Box className="empty" {...rest}>
      {children}
    </Box>
  )
}
