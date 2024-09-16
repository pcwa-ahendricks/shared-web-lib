import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type SlideInLeftProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const SlideInLeft = ({children, ...rest}: SlideInLeftProps) => {
  return (
    <Animate
      name="slide-in-left"
      easingFunc="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
      duration={500}
      animate3d
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default SlideInLeft
