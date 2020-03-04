import React from 'react'
import GlowButton from '../GlowButton/GlowButton'

type Props = {
  children?: React.ReactNode
}

const EspanolButton = ({children}: Props) => {
  return <GlowButton size="small">{children}</GlowButton>
}

export default EspanolButton
