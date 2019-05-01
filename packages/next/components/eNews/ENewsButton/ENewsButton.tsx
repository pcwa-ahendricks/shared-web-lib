import React from 'react'
import GlowButton, {
  BaseGlowButtonProps
} from '@components/GlowButton/GlowButton'
// import {type ButtonProps} from '@material-ui/core/Button'

type Props = {
  children: React.ReactNode
} & BaseGlowButtonProps

const EnewsButton = ({children, ...rest}: Props) => {
  return (
    <GlowButton color="primary" aria-label="Open Dialog" {...rest}>
      {children}
    </GlowButton>
  )
}

export default EnewsButton
