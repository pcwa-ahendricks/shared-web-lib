import React from 'react'
import Animate, {AnimateProps} from './Animate'

type SlideInLeftProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const SlideInLeft = ({children, ...rest}: SlideInLeftProps) => {
  return (
    <Animate
      name="slide-in-left"
      easingFunc="cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      duration={500}
      animate3d
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default SlideInLeft
