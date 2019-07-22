import React from 'react'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'
import {useTheme} from '@material-ui/styles'
import {Theme} from '@material-ui/core'

const EnewsButton = ({children, ...rest}: GlowButtonProps) => {
  const theme = useTheme<Theme>()
  return (
    <GlowButton
      inactiveColor={theme.palette.primary.main}
      aria-label="Open Dialog"
      {...rest}
    >
      {children}
    </GlowButton>
  )
}

export default EnewsButton
