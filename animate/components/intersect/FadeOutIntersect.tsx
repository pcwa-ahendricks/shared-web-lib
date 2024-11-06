'use client'

import {Box} from '@mui/material'
import FadeOut, {FadeOutProps} from '../FadeOut'
import {useIntersectionAnimation} from '../../hooks/useIntersectAnimation'

/**
 * Props for the `FadeOutIntersect` component, extending `FadeOutProps`.
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
export interface FadeOutIntersectProps extends FadeOutProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  noDelayOnIntersects?: boolean | number
}

/**
 * `FadeOutIntersect` component that triggers a fade-in animation from the left
 * when the component intersects with the viewport. The animation can be forced to
 * show every time with the `alwaysAnimate` prop.
 *
 * @param {FadeOutIntersectProps} props - The props for the component.
 * @returns {JSX.Element} The `FadeOutIntersect` component.
 */
const FadeOutIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate: animateParam = true,
  noDelayOnIntersects = false,
  delay: delayParam,
  ...props
}: FadeOutIntersectProps) => {
  const {ref, shouldAnimate, delay, animateDoneHandler} =
    useIntersectionAnimation({
      animateKey,
      root,
      rootMargin,
      alwaysAnimate,
      noDelayOnIntersects,
      delayParam
    })

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <FadeOut
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        delay={delay}
        // I don't think this is necessary if alwaysAnimate prop is used. Effectively, the children should not display (ie fully transparent) when navigating back to the page containing the element.
        // Sets opacity to 0 after animation completes if `alwaysAnimate` is false and animation has run previously
        // sx={{...(!alwaysAnimate && previouslyAnimated && {opacity: 0}), ...sx}}
        {...props}
      >
        {children}
      </FadeOut>
    </Box>
  )
}

export default FadeOutIntersect
