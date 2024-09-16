import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeInProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeIn = ({children, ...props}: FadeInProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-in"
      easingFunc="cubic-bezier(0.390, 0.575, 0.565, 1.000)"
      duration={1200}
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeIn
