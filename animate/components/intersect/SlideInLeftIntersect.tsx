'use client'

import {Box} from '@mui/material'
import SlideInLeft, {type SlideInLeftProps} from '../SlideInLeft'
import useIntersectionAnimation, {
  type IntersectionAnimationProps
} from '../../hooks/useIntersectAnimation'

/**
 * Properties for the `SlideInLeftIntersect` component, extending `SlideInLeftProps`.
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
export interface SlideInLeftIntersectProps
  extends SlideInLeftProps,
    IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersects?: boolean | number
}

/**
 * A component that triggers a "slide-in-left" animation when it intersects with the viewport.
 * Uses intersection observer to determine when to animate and manages animation state in context.
 *
 * @param {SlideInLeftIntersectProps} props - Properties for configuring the component.
 * @returns {JSX.Element} Rendered `SlideInLeftIntersect` component.
 */
const SlideInLeftIntersect = ({
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
}: SlideInLeftIntersectProps) => {
  const {ref, shouldAnimate, delay, animateDoneHandler} =
    useIntersectionAnimation({
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
