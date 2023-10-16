import React from 'react'
import {Box, BoxProps} from '@mui/material'

const SectionBox = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="section" {...rest}>
      {children}
    </Box>
  )
}

export default SectionBox
