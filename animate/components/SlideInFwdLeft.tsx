import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type SlideInFwdLeftProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const SlideInFwdLeft = ({children, ...rest}: SlideInFwdLeftProps) => {
  return (
    <Animate
      name="slide-in-fwd-left"
      easingFunc="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
      duration={500}
      animate3d
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default SlideInFwdLeft
