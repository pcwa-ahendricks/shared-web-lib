// @flow
import React, {type Node} from 'react'
import GlowButton from '../../GlowButton/GlowButton'

type Props = {
  children?: Node
}

const EnewsButton = ({children}: Props) => {
  return (
    <GlowButton color="primary" aria-label="Open Dialog">
      {children}
    </GlowButton>
  )
}

export default EnewsButton
