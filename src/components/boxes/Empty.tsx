import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

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
