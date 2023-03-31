import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

type Props = {children?: React.ReactNode} & BoxProps

const MainBox = ({children, ...rest}: Props) => {
  return (
    <Box component="main" {...rest}>
      {children}
    </Box>
  )
}

export default MainBox
