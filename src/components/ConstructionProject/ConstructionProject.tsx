import React from 'react'
import {Box} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'

const ConstructionProject = ({children, ...rest}: BoxProps) => {
  const theme = useTheme()
  return (
    <Box
      p={2}
      pb={4}
      bgcolor={theme.palette.common.white}
      boxShadow={3}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default ConstructionProject
