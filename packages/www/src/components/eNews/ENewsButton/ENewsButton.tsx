import React from 'react'
import GlowButton, {GlowButtonProps} from '@components/GlowButton/GlowButton'

const EnewsButton = ({children, ...rest}: GlowButtonProps) => {
  return (
    <GlowButton aria-label="Open Dialog" {...rest}>
      {children}
    </GlowButton>
  )
}

export default EnewsButton
