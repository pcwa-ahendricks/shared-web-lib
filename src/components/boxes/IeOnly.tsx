import React from 'react'
import {Box, BoxProps} from '@material-ui/core'
import useMatchesIe from '@hooks/useMatchesIe'

export default function IeOnly({children, ...props}: BoxProps) {
  const matchesIe = useMatchesIe()
  console.log('ieOnly: ', matchesIe)
  return matchesIe ? <Box {...props}>{children}</Box> : null
}
