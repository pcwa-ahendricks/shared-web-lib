import React, {useState, useCallback, useMemo} from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/core/styles'
import {BoxProps} from '@material-ui/core/Box'

export type GlowGreenProps = {
  children: React.ReactNode
  active?: boolean
  activeColor?: string
  inactiveColor?: string
} & BoxProps

interface UseStylesProps {
  active: boolean
  inactiveColor: string
  activeColor: string
}

const useStyles = makeStyles(() =>
  createStyles({
    glowGreenButton: ({
      active,
      inactiveColor,
      activeColor
    }: UseStylesProps) => ({
      color: active ? activeColor : inactiveColor
    })
  })
)

const GlowGreen = ({
  children,
  active: activeProp,
  activeColor,
  inactiveColor,
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
  const classes = useStyles({
    active: isActive,
    activeColor,
    inactiveColor
  })

  const buttonEnterHandler = useCallback(() => {
    setActive(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setActive(false)
  }, [])

  return (
    <Box
      className={classes.glowGreenButton}
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
