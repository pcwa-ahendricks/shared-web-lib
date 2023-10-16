import React, {useState, useEffect} from 'react'
import {
  Box,
  BoxProps,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@mui/material'
import JackinBox, {JackinBoxProps} from 'mui-jackinbox'
import HandIcon from 'mdi-material-ui/HandPointingRight'
import {useTimeoutFn} from 'react-use'

export default function IrrigSvcAgreeLookHere({
  children,
  animate,
  ...rest
}: BoxProps & Partial<JackinBoxProps>) {
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
      <JackinBox name="fadeOut" delay={5} animate={show} hideUntilAnimate>
        <JackinBox
          name="backInLeft"
          position="absolute"
          left={-180}
          top={-50}
          zIndex={1}
          width={140}
          textAlign="center"
          animate={show}
          hideUntilAnimate
        >
          <Type variant="h4" color="primary" style={{letterSpacing: '.3px'}}>
            <em>Click link to see FAQ's</em>
          </Type>
          <HandIcon color="primary" fontSize="large" />
        </JackinBox>
      </JackinBox>
    </Box>
  )
}