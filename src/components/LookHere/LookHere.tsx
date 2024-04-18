import React, {useState, useEffect} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@mui/material'
import HandIcon from 'mdi-material-ui/HandPointingRight'
import {useTimeoutFn} from 'react-use'
import FadeOut from '@components/boxes/animate/FadeOut'
import {AnimateProps} from '@components/boxes/animate/Animate'
import SlideInEllipticFwdLeft from '@components/boxes/animate/SlideInEllipticLeftFwd'

export default function LookHere({
  children,
  animate,
  ...rest
}: BoxProps & Partial<AnimateProps>) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const [show, setShow] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useTimeoutFn(() => setTimeUp(true), 2500)

  useEffect(() => {
    setShow(Boolean(!isXs && animate && timeUp))
  }, [isXs, animate, timeUp])

  return (
    <Box position="relative" {...rest}>
      {children}
      <SlideInEllipticFwdLeft
        animate={show}
        hiddenUntilAnimate
        sx={{
          position: 'absolute',
          left: -180,
          top: 20,
          zIndex: 1,
          width: 140,
          textAlign: 'center'
        }}
      >
        <FadeOut delay={5000} animate={show}>
          <Type
            component="em"
            variant="h4"
            color="primary"
            sx={{letterSpacing: '.3px'}}
          >
            Click flyer to learn more
          </Type>
          <br />
          <HandIcon color="primary" fontSize="large" />
        </FadeOut>
      </SlideInEllipticFwdLeft>
    </Box>
  )
}
