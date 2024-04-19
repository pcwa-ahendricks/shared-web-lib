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
import SlideInFwdLeft from '@components/boxes/animate/SlideInFwdLeft'
import {AnimateProps} from '@components/boxes/animate/Animate'

export default function IrrigSvcAgreeLookHere({
  children,
  animate,
  ...rest
}: BoxProps & Partial<AnimateProps>) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const [show, setShow] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  useTimeoutFn(() => setTimeUp(true), 3000)
  useEffect(() => {
    setShow(Boolean(!isXs && animate && timeUp))
  }, [isXs, animate, timeUp])

  return (
    <Box position="relative" {...rest}>
      {children}
      {/* don't set absolute positioning on a animation component that uses 'transform: translateZ()' or in a child component therein, instead set on parent so perspective and positioning doesn't interfere/break */}
      <Box
        sx={{
          position: 'absolute',
          left: -180,
          top: -50,
          zIndex: 1,
          width: 140,
          textAlign: 'center'
        }}
      >
        <SlideInFwdLeft animate={show} hiddenUntilAnimate>
          <FadeOut delay={5000} animate={show}>
            <Type
              component="em"
              variant="h4"
              color="primary"
              sx={{letterSpacing: '.3px'}}
            >
              Click link to see FAQ's
            </Type>
            <br />
            <HandIcon color="primary" fontSize="large" />
          </FadeOut>
        </SlideInFwdLeft>
      </Box>
    </Box>
  )
}
