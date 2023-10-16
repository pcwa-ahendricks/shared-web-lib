import React from 'react'
import {Box, BoxProps} from '@mui/material'

const NavBox = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="nav" {...rest}>
      {children}
    </Box>
  )
}

export default NavBox
