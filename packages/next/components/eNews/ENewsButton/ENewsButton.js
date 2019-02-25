// @flow
import React, {type Node} from 'react'
import GlowButton, {type BaseGlowButtonProps} from '../../GlowButton/GlowButton'
// import {type ButtonProps} from '@material-ui/core/Button'

type Props = {
  children: Node
} & BaseGlowButtonProps

const EnewsButton = ({children, ...rest}: Props) => {
  return (
    <GlowButton color="primary" aria-label="Open Dialog" {...rest}>
      {children}
    </GlowButton>
  )
}

export default EnewsButton
