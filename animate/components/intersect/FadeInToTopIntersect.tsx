'use client'

import {Box} from '@mui/material'
import FadeInToTop, {type FadeInToTopProps} from '../FadeInToTop'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../../hooks/useIntersectAnimation'

/**
 * Properties for the `FadeInToTopIntersect` component, extending `FadeInToTopProps`.
 *
 * @typedef {Object} SlideInLeftIntersectProps
 * @property {string} animateKey - Unique key for tracking animation status.
 * @property {Element|null} [root=null] - The root element for the intersection observer.
 * @property {string} [rootMargin='0px'] - Margin around the root for intersection.
 * @property {boolean} [alwaysAnimate=false] - Whether to always animate on intersect, regardless of previous animation status.
 * @property {boolean} [noDelayOnIntersects=false] - If true, removes delay when the element intersects for the first time.
 * @property {boolean} [animate=true] - Whether to allow animation.
 * @property {number} [delay] - Delay before starting the animation, in milliseconds.
 */
export interface FadeInToTopIntersectProps
  extends FadeInToTopProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersects?: boolean | number
}

/**
 * A component that triggers a "fade-in-to-top" animation when intersecting with the viewport.
 * Manages animation state and triggers `onAnimationEnd` after completion.
 *
 * @param {FadeInToTopIntersectProps} props - The properties to configure the component.
 * @returns {JSX.Element} Rendered `FadeInToTopIntersect` component.
 */
const FadeInToTopIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersects = false,
  delay: delayParam,
  onScrollDownOnly,
  ...props
}: FadeInToTopIntersectProps) => {
  const {
    ref,
    shouldAnimate,
    delay,
    animateDoneHandler,
    previouslyAnimated
    // scrollDirection
  } = useIntersectionAnimation({
    animateKey,
    root,
    rootMargin,
    alwaysAnimate,
    noDelayOnIntersects,
    delayParam,
    onScrollDownOnly
  })

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeInToTop
        transparentUntilAnimate={alwaysAnimate || !previouslyAnimated}
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
