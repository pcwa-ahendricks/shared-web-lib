'use client'

import FadeIn, {type FadeInProps} from '../FadeIn'
import {Box} from '@mui/material'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../../hooks/useIntersectAnimation'

/**
 * Props for the `FadeInIntersect` component, extending `FadeInProps`.
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
export interface FadeInIntersectProps
  extends FadeInProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersects?: boolean | number
}

/**
 * `FadeInIntersect` component that triggers a fade-in animation from the left
 * when the component intersects with the viewport. The animation can be forced to
 * show every time with the `alwaysAnimate` prop.
 *
 * @param {FadeInIntersectProps} props - The props for the component.
 * @returns {JSX.Element} The `FadeInIntersect` component.
 */
const FadeInIntersect = ({
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
}: FadeInIntersectProps) => {
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
      <FadeIn
        transparentUntilAnimate={alwaysAnimate || !previouslyAnimated}
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
