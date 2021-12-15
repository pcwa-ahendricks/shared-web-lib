import React from 'react'
import {Box, BoxProps} from '@material-ui/core'
import useMatchesIe from '@hooks/useMatchesIe'

export default function IeNever({children, ...props}: BoxProps) {
  const matches = useMatchesIe()
  console.log('ieNever: ', matches)
  return matches ? null : <Box {...props}>{children}</Box>
}
