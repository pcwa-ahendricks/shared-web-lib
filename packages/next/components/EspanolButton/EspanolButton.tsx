import React from 'react'
import GlowButton from '../GlowButton/GlowButton'
import {useTheme} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

type Props = {
  children?: React.ReactNode
}

const EspanolButton = ({children}: Props) => {
  const theme = useTheme<Theme>()
  return (
    <GlowButton size="small" inactiveColor={theme.palette.primary.main}>
      {children}
    </GlowButton>
  )
}

export default EspanolButton
