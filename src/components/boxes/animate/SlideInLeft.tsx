import React from 'react'
import Animate, {AnimateProps} from './Animate'

const SlideInLeft = ({
  children,
  delay = 0,
  animate = true,
  ...rest
}: AnimateProps) => {
  const {sx, ...restBoxProps} = rest
  return (
    <Animate
      sx={{
        ...(animate && {
          // '-webkit-animation': `slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`,
          animation: `slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms both`
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
