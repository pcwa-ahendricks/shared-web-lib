import React from 'react'
import Animate, {AnimateProps} from './Animate'

type ScaleInCenterProps = Omit<AnimateProps, 'name' | 'easingFunc'>

const ScaleInCenter = ({children, ...rest}: ScaleInCenterProps) => {
  return (
    <Animate
      name="scale-in-center"
      easingFunc="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
      duration={500}
      transparentUntilAnimate
      {...rest}
    >
      {children}
    </Animate>
  )
}
export default ScaleInCenter
