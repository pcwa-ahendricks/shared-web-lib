import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children?: React.ReactNode} & BoxProps

const RowBox = ({children, ...rest}: Props) => {
  return (
    <Box display="flex" flexDirection="row" {...rest}>
      {children}
    </Box>
  )
}

const ColumnBox = ({children, ...rest}: Props) => {
  return (
    <Box display="flex" flexDirection="column" {...rest}>
      {children}
    </Box>
  )
}

export {RowBox, ColumnBox}
