import {Box} from '@mui/material'
import SlideInLeft, {type SlideInLeftProps} from './SlideInLeft'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'

export interface SlideInLeftIntersectProps
  extends SlideInLeftProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
}

const SlideInLeftIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersected = false,
  delay: delayParam,
  ...props
}: SlideInLeftIntersectProps) => {
  const {ref, shouldAnimate, delay, animateDoneHandler} =
    useIntersectionAnimation({
      animateKey,
      root,
      rootMargin,
      alwaysAnimate,
      noDelayOnIntersected,
      animate: animateParam,
      delay: delayParam
    })

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <SlideInLeft
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        {...props}
      >
        {children}
      </SlideInLeft>
    </Box>
  )
}

export default SlideInLeftIntersect
