import React from 'react'
import {Box, BoxProps} from '@mui/material'

type Props = {children?: React.ReactNode} & BoxProps

const NavBox = ({children, ...rest}: Props) => {
  return (
    <Box component="nav" {...rest}>
      {children}
    </Box>
  )
}

export default NavBox
