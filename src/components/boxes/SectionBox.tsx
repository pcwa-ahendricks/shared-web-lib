import React from 'react'
import {Box, BoxProps} from '@mui/material'

type Props = {children?: React.ReactNode} & BoxProps

const SectionBox = ({children, ...rest}: Props) => {
  return (
    <Box component="section" {...rest}>
      {children}
    </Box>
  )
}

export default SectionBox
