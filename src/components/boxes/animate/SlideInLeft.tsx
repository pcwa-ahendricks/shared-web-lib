import React from 'react'
import Animate, {AnimateProps} from './Animate'

type Props = Omit<AnimateProps, 'name'>

const SlideInLeft = ({children, ...rest}: Props) => {
  return (
    <Animate name="slide-in-left" {...rest}>
      {children}
    </Animate>
  )
}

export default SlideInLeft
