'use client'

import {Box} from '@mui/material'
import FadeOut, {FadeOutProps} from './FadeOut'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'
import usePostAnimationTransparency from '../hooks/usePostAnimationTransparency'

export interface FadeOutIntersectProps
  extends FadeOutProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
}

const FadeOutIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersected = false,
  delay: delayParam,
  sx,
  ...props
}: FadeOutIntersectProps) => {
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

  // The children should not display (ie fully transparent) when navigating back to the page containing the element.
  // Sets opacity to 0 after animation completes if `alwaysAnimate` is false and animation has run previously
  const endTransparent = usePostAnimationTransparency({
    alwaysAnimate,
    previouslyAnimated
  })

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeOut
        transparentAfterAnimate={endTransparent}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        {...props}
      >
        {children}
      </FadeOut>
    </Box>
  )
}

export default FadeOutIntersect
