import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children?: React.ReactNode} & BoxProps

const SectionBox = ({children, ...rest}: Props) => {
  return (
    <Box component="section" {...rest}>
      {children}
    </Box>
  )
}

export default SectionBox
