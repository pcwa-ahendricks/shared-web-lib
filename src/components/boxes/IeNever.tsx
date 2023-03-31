import React from 'react'
import {Box, BoxProps} from '@mui/material'
import useMatchesIe from '@hooks/useMatchesIe'

export default function IeNever({children, ...props}: BoxProps) {
  const matches = useMatchesIe()
  return matches ? null : <Box {...props}>{children}</Box>
}
