import React, {useMemo} from 'react'
import {Box, useMediaQuery} from '@material-ui/core'
import {useTheme} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'

type Props = {children?: React.ReactNode} & BoxProps

const MainBox = ({children, ...rest}: Props) => {
  const theme = useTheme()
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const marginTop = useMemo(() => (isSMUp ? 4 : 1), [isSMUp])
  return (
    <Box component="main" mt={marginTop} mb={4} {...rest}>
      {children}
    </Box>
  )
}

export default MainBox
