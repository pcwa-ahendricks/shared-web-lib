import {Box} from '@mui/material'
import FadeInFromTop, {type FadeInFromTopProps} from './FadeInFromTop'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../hooks/useIntersectAnimation'
import useInitialAnimationTransparency from '../hooks/useInitialAnimationTransparency'
import {useScrollDirection} from '../../react-use'
import FadeInFromBottom from './FadeInFromBottom'
import {useEffect} from 'react'

export interface FadeInFromTopIntersectProps
  extends FadeInFromTopProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersected?: boolean | number
  reverseOnScrollUp?: boolean
  noAnimateBeforeScroll?: boolean
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
  noAnimateBeforeScroll = false,
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

  const suppress =
    noAnimateBeforeScroll && scrollDirection === null && shouldAnimate

  useEffect(() => {
    if (suppress) {
      // When suppressed; mark as done so it won't animate later.
      animateDoneHandler()
    }
  }, [suppress, animateDoneHandler])

  if (suppress) {
    return (
      <Box ref={ref} sx={{display: 'inherit'}}>
        {children}
      </Box>
    )
  }

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
