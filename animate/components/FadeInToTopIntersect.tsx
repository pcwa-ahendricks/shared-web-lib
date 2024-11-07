'use client'

import {Box} from '@mui/material'
import FadeInToTop, {type FadeInToTopProps} from './FadeInToTop'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'
import useInitialAnimationTransparency from '../hooks/useInitialAnimationTransparency'

export interface FadeInToTopIntersectProps
  extends FadeInToTopProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
}

const FadeInToTopIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersected = false,
  delay: delayParam,
  ...props
}: FadeInToTopIntersectProps) => {
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
      <FadeInToTop
        transparentUntilAnimate={startTransparent}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        {...props}
      >
        {children}
      </FadeInToTop>
    </Box>
  )
}

export default FadeInToTopIntersect
