import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type TextFocusInOpaqueProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const TextFocusInOpaque = ({children, ...rest}: TextFocusInOpaqueProps) => {
  return (
    <Animate
      name="text-focus-in-opaque"
      easingFunc="cubic-bezier(0.550, 0.085, 0.680, 0.530)"
      duration={1000}
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default TextFocusInOpaque
