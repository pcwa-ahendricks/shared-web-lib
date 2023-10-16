import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

const MainBox = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="main" {...rest}>
      {children}
    </Box>
  )
}

export default MainBox
