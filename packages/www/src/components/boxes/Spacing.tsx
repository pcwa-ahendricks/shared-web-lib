import React, {useMemo} from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {
  children?: React.ReactNode
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

  return (
    <Box my={spacing} {...rest}>
      {children}
    </Box>
  )
}

export default Spacing
