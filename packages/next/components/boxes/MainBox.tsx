import React from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children: React.ReactNode} & BoxProps

const MainBox = ({children, ...rest}: Props) => {
  return (
    <Box component="main" {...rest} mt={5} mb={5}>
      {children}
    </Box>
  )
}

export default MainBox
