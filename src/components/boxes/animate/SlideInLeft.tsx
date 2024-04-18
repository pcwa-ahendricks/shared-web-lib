import React from 'react'
import Animate, {AnimateProps} from './Animate'

const SlideInLeft = ({
  children,
  delay = 0,
  duration = 500,
  animate = true,
  iterations = 1,
  direction = 'normal',
  fillMode = 'both',
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  return (
    <Animate
      sx={{
        ...(animate && {
          // '-webkit-animation': `slide-in-left ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`,
          animation: `slide-in-left ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms ${iterations} ${direction} ${fillMode}`
        }),
        ...sx
      }}
      {...restBoxProps}
    >
      {children}
    </Animate>
  )
}

export default SlideInLeft
