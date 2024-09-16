import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeOutProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeOut = ({children, ...props}: FadeOutProps) => {
  const {sx, ...rest} = props || {}
  return (
    <Animate
      sx={{willChange: 'opacity', ...sx}} // hinting the browser for optimization
      name="fade-out"
      easingFunc="ease-out"
      duration={1000}
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default FadeOut
