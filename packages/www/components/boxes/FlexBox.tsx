import React, {useMemo} from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children?: React.ReactNode} & BoxProps

export type RespChildBoxProps = {
  children?: React.ReactNode
  flexSpacing?: number
  first?: boolean
} & BoxProps

/*
  From https://github.com/angular/flex-layout/wiki/fxFlex-API
  alias 	    Equivalent CSS
  grow 	      flex: 1 1 100%
  initial 	  flex: 0 1 auto
  auto 	      flex: <grow> <shrink> 100%
  none 	      flex: 0 0 auto
  nogrow 	    flex: 0 1 auto
  noshrink 	  flex: 1 0 auto
*/

const RowBox = ({children, ...rest}: Props) => {
  return (
    <Box display="flex" flexDirection="row" {...rest}>
      {children}
    </Box>
  )
}

const RespRowBox = ({children, ...rest}: Props) => {
  return (
    <Box display="flex" flexDirection={{xs: 'column', sm: 'row'}} {...rest}>
      {children}
    </Box>
  )
}

const RespChildBox = ({
  flexSpacing: flexSpacingProp = 0,
  first = false,
  children,
  ...rest
}: RespChildBoxProps) => {
  const flexSpacing = useMemo(() => (!first ? flexSpacingProp : 0), [
    flexSpacingProp,
    first
  ])

  return (
    <Box mt={{xs: flexSpacing, sm: 0}} ml={{xs: 0, sm: flexSpacing}} {...rest}>
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

export {RowBox, RespRowBox, RespChildBox, ColumnBox}
