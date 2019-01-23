// @flow
import React, {type Node} from 'react'
import GlowButton from '../GlowButton/GlowButton'

type Props = {
  children?: Node
}

const EspanolButton = ({children}: Props) => {
  return (
    <GlowButton size="small" color="primary">
      {children}
    </GlowButton>
  )
}

export default EspanolButton
