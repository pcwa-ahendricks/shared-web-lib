import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type FadeOutProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const FadeOut = ({children, ...rest}: FadeOutProps) => {
  return (
    <Animate name="fade-out" easingFunc="ease-out" duration={1000} {...rest}>
      {children}
    </Animate>
  )
}

export default FadeOut
