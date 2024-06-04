import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type WobbleVerLeftProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const WobbleVerLeft = ({children, ...rest}: WobbleVerLeftProps) => {
  return (
    <Animate name="wobble-ver-left" duration={800} animate3d {...rest}>
      {children}
    </Animate>
  )
}

export default WobbleVerLeft
