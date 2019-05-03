import React from 'react'
import GlowButton from '@components/GlowButton/GlowButton'

type Props = {
  children: React.ReactNode
}

const EnewsButton = ({children, ...rest}: Props) => {
  return (
    <GlowButton color="primary" aria-label="Open Dialog" {...rest}>
      {children}
    </GlowButton>
  )
}

export default EnewsButton
