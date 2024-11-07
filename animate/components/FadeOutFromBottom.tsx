import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeOutFromBottomProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeOutFromBottom = ({children, ...props}: FadeOutFromBottomProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-out-from-bottom"
      easingFunc="ease"
      duration={800}
      fillMode="forwards"
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeOutFromBottom
