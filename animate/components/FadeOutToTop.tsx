import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeOutToTopProps = Omit<AnimateProps, 'name' | 'easingFunc'>

/* TODO - I haven't tested this component */
const FadeOutToTop = ({children, ...props}: FadeOutToTopProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-out-to-top"
      easingFunc="linear"
      duration={1000}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeOutToTop
