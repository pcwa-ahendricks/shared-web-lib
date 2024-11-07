'use client'

import {Box} from '@mui/material'
import FadeInFromTop, {type FadeInFromTopProps} from './FadeInFromTop'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'
import useInitialAnimationTransparency from '../hooks/useInitialAnimationTransparency'
import {useScrollDirection} from '../../react-use'
import FadeInFromBottom from './FadeInFromBottom'

export interface FadeInFromTopIntersectProps
  extends FadeInFromTopProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
  reverseOnScrollUp?: boolean
}

const FadeInFromTopIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersected = false,
  delay: delayParam,
  reverseOnScrollUp = true,
  ...props
}: FadeInFromTopIntersectProps) => {
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

  const scrollDirection = useScrollDirection()

  if (reverseOnScrollUp && scrollDirection === 'up') {
    return (
      <Box ref={ref} sx={{display: 'inherit'}}>
        <FadeInFromBottom
          transparentUntilAnimate={startTransparent}
          animate={shouldAnimate}
          onAnimationEnd={animateDoneHandler}
          delay={delay}
          {...props}
        >
          {children}
        </FadeInFromBottom>
      </Box>
    )
  }

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeInFromTop
        transparentUntilAnimate={startTransparent}
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        {...props}
      >
        {children}
      </FadeInFromTop>
    </Box>
  )
}

export default FadeInFromTopIntersect
