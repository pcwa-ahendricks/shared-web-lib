'use client'

import FadeIn, {type FadeInProps} from './FadeIn'
import {Box} from '@mui/material'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'
import useInitialAnimationTransparency from '../hooks/useInitialAnimationTransparency'

export interface FadeInIntersectProps
  extends FadeInProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
}

const FadeInIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersected = false,
  delay: delayParam,
  ...props
}: FadeInIntersectProps) => {
  const {ref, shouldAnimate, delay, animateDoneHandler, previouslyAnimated} =
    useIntersectionAnimation({
      animateKey,
      root,
      rootMargin,
      alwaysAnimate,
      noDelayOnIntersected,
      animate: animateParam,
      delay: delayParam
    })

  const startTransparent = useInitialAnimationTransparency({
    alwaysAnimate,
    previouslyAnimated
  })

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeIn
        transparentUntilAnimate={startTransparent}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        {...props}
      >
        {children}
      </FadeIn>
    </Box>
  )
}

export default FadeInIntersect
