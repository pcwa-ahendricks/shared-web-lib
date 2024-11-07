import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeInFromTopProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeInFromTop = ({children, ...props}: FadeInFromTopProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-in-from-top"
      easingFunc="ease"
      duration={1000}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeInFromTop
