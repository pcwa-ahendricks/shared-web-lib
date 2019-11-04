import React, {useMemo} from 'react'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'

type Props = {
  children?: React.ReactNode
  size?: 'medium' | 'small' | 'large' | 'x-large'
} & BoxProps

const Spacing = ({children, size = 'medium', ...rest}: Props) => {
  const spacing = useMemo(() => {
    switch (size) {
      case 'small':
        return 2
      case 'medium':
        return 3
      case 'large':
        return 4
      case 'x-large':
        return 5
      default:
        return 3
    }
  }, [size])

  return (
    <Box my={spacing} {...rest}>
      {children}
    </Box>
  )
}

export default Spacing
