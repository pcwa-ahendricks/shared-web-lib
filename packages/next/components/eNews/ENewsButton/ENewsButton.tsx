import React from 'react'
import GlowButton from '@components/GlowButton/GlowButton'
import {ButtonProps} from '@material-ui/core/Button'

type Props = {
  children: React.ReactNode
} & ButtonProps

const EnewsButton = ({children, ...rest}: Props) => {
  return (
    <GlowButton color="primary" aria-label="Open Dialog" {...rest}>
      {children}
    </GlowButton>
  )
}

export default EnewsButton
