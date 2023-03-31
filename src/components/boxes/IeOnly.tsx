import React from 'react'
import {Box, BoxProps} from '@mui/material'
import useMatchesIe from '@hooks/useMatchesIe'

export default function IeOnly({children, ...props}: BoxProps) {
  const matchesIe = useMatchesIe()
  return matchesIe ? <Box {...props}>{children}</Box> : null
}
