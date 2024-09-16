import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeInToTopProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeInToTop = ({children, ...props}: FadeInToTopProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-in-to-top"
      easingFunc="linear"
      duration={1200}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeInToTop
