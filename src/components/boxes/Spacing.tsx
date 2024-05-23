import React, {useMemo} from 'react'
import {Box, BoxProps, useMediaQuery} from '@mui/material'
import useTheme from '@hooks/useTheme'

type Props = {
  size?: 'medium' | 'x-small' | 'small' | 'large' | 'x-large'
  factor?: number
} & BoxProps

const Spacing = ({children, factor = 1, size = 'medium', ...rest}: Props) => {
  const spacing = useMemo(() => {
    switch (size) {
      case 'x-small':
        return 1 * factor
      case 'small':
        return 2 * factor
      case 'medium':
        return 3 * factor
      case 'large':
        return 4 * factor
      case 'x-large':
        return 5 * factor
      default:
        return 3 * factor
    }
  }, [size, factor])

  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  // shrink vertical spacing on mobile devices
  const responsiveSpacing = isXS ? spacing * 0.75 : spacing

  return (
    <Box my={responsiveSpacing} {...rest}>
      {children}
    </Box>
  )
}

export default Spacing
