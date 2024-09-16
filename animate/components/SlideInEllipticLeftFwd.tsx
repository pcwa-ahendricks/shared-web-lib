import React from 'react'
import Animate, {AnimateProps} from './Animate'

export type SlideInEllipticLeftFwdProps = Omit<
  AnimateProps,
  'name' | 'easingFunc'
>

const SlideInEllipticLeftFwd = ({
  children,
  ...rest
}: SlideInEllipticLeftFwdProps) => {
  return (
    <Animate
      name="slide-in-elliptic-left-fwd"
      easingFunc="cubic-bezier(0.250, 0.460, 0.450, 0.940)"
      duration={700}
      animate3d
      {...rest}
    >
      {children}
    </Animate>
  )
}

export default SlideInEllipticLeftFwd
