import React, {useState, useEffect, useCallback} from 'react'
import {Box, Theme} from '@material-ui/core'
import {createStyles, makeStyles, useTheme} from '@material-ui/styles'
import {BoxProps} from '@material-ui/core/Box'

const useGlowGreenButtonStyles = makeStyles(() =>
  createStyles({
    glowGreenButton: ({
      active,
      inactiveColor,
      activeColor
    }: {
      active: boolean
      inactiveColor: string
      activeColor: string
    }) => ({
      color: active ? activeColor : inactiveColor
    })
  })
)

type GlowGreenProps = {
  children: React.ReactNode
  active?: boolean
  activeColor?: string
  inactiveColor?: string
} & BoxProps

const GlowGreen = ({
  children,
  active: activeProp = false,
  activeColor,
  inactiveColor,
  ...rest
}: GlowGreenProps) => {
  const theme = useTheme<Theme>()
  activeColor = activeColor || theme.palette.secondary.main
  inactiveColor = inactiveColor || 'inherit'
  const [active, setActive] = useState<boolean>(false)
  const classes = useGlowGreenButtonStyles({active, activeColor, inactiveColor})

  useEffect(() => {
    setActive(activeProp)
  }, [activeProp])

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

export default GlowGreen
