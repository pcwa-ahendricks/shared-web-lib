import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

const Span = ({children, ...rest}: Partial<BoxProps>) => {
  return (
    <Box component="span" {...rest}>
      {children}
    </Box>
  )
}

export default Span
