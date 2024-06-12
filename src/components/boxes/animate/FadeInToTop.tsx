import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeInToTopProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeInToTop = ({children, ...rest}: FadeInToTopProps) => {
  return (
    <Animate
      sx={{willChange: 'opacity'}} // hinting the browser for optimization
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
