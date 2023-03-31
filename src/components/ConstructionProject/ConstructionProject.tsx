import React from 'react'
import {Box, useTheme, BoxProps} from '@mui/material'

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
