import React, {useState, useCallback, useMemo} from 'react'
import {Box, Theme, useTheme, BoxProps} from '@mui/material'

export type GlowGreenProps = {
  children: React.ReactNode
  active?: boolean
  activeColor?: string
  inactiveColor?: string
} & BoxProps

const GlowGreen = ({
  children,
  active: activeProp,
  activeColor,
  inactiveColor,
  sx,
  ...rest
}: GlowGreenProps) => {
  const theme = useTheme<Theme>()
  activeColor = activeColor ?? theme.palette.secondary.main
  inactiveColor = inactiveColor ?? 'inherit'
  const [active, setActive] = useState<boolean>(false)

  const isActive = useMemo(
    () => (activeProp !== undefined ? activeProp : active),
    [activeProp, active]
  )

  const buttonEnterHandler = useCallback(() => {
    setActive(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setActive(false)
  }, [])

  return (
    <Box
      sx={{
        ...sx,
        color: isActive ? activeColor : inactiveColor
      }}
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
      {...rest}
    >
      {children}
    </Box>
  )
}

const GlowLightGreen = ({
  children,
  ...rest
}: {children: React.ReactNode} & GlowGreenProps) => {
  const theme = useTheme()
  return (
    <GlowGreen activeColor={theme.palette.secondary.light} {...rest}>
      {children}
    </GlowGreen>
  )
}

const GlowDarkGreen = ({
  children,
  ...rest
}: {children: React.ReactNode} & GlowGreenProps) => {
  const theme = useTheme()
  return (
    <GlowGreen activeColor={theme.palette.secondary.dark} {...rest}>
      {children}
    </GlowGreen>
  )
}

export default GlowGreen
export {GlowLightGreen, GlowDarkGreen}
