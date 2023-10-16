import React from 'react'
import {Box, BoxProps} from '@mui/material'

type Props = {
  children?: React.ReactNode
} & BoxProps

export default function Empty({children, ...rest}: Props) {
  return (
    <Box className="empty" {...rest}>
      {children}
    </Box>
  )
}
