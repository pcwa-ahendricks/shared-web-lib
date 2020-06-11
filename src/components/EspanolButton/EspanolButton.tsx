import React from 'react'
import GlowButton from '../GlowButton/GlowButton'

type Props = {
  children?: React.ReactNode
}

/* NOT USED - See https://translate.google.com/intl/en/about/website/ for more info. */

const EspanolButton = ({children}: Props) => {
  return <GlowButton size="small">{children}</GlowButton>
}

export default EspanolButton
