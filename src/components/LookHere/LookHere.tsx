import React from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import Animate, {AnimateProps} from '@components/Animate/Animate'
import HandIcon from 'mdi-material-ui/HandPointingRight'

export default function LookHere({
  children,
  animate,
  ...rest
}: BoxProps & Partial<AnimateProps>) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const show = !isXs && animate

  return (
    <Box position="relative" {...rest}>
      {children}
      <Animate name="fadeOut" delay={5} animate={show} hideUntilAnimate>
        <Animate
          name="backInLeft"
          position="absolute"
          left={-200}
          top={20}
          zIndex={1}
          width={140}
          textAlign="center"
          animate={show}
          hideUntilAnimate
        >
          <Type variant="h4" color="primary" style={{letterSpacing: '.3px'}}>
            <em>Click flyer to learn more</em>
          </Type>
          <HandIcon color="primary" fontSize="large" />
        </Animate>
      </Animate>
    </Box>
  )
}
