import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useIntersection} from 'react-use'
import {
  AnimateContext,
  setAnimateDone
} from '../components/intersect/AnimateContext'
import useScrollDirection from '../../react-use/useScrollDirection'

/**
 * Properties for configuring the `useIntersectionAnimation` hook.
 *
 * @typedef {Object} IntersectionAnimationProps
 * @property {string} animateKey - Unique key for tracking the animation status.
 * @property {Element|null} [root=null] - The root element for the intersection observer.
 * @property {string} [rootMargin='0px'] - Margin around the root for intersection.
 * @property {boolean} [alwaysAnimate=false] - Whether to always animate on intersect, regardless of previous animation status.
 * @property {boolean} [animateParam=true] - Whether the animation should be enabled.
 * @property {boolean|number} [noDelayOnIntersects=false] - If true or a number, removes or reduces delay when the element intersects for the first time.
 * @property {number} [delayParam] - Delay before starting the animation, in milliseconds.
 * @property {boolean} [onScrollDownOnly=true] - Whether the animation should only trigger when scrolling down.
 */
export interface IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  animateParam?: boolean
  noDelayOnIntersects?: boolean | number
  delayParam?: number
  onScrollDownOnly?: boolean
}

/**
 * Custom hook that triggers an animation when an element intersects with the viewport.
 * Can be configured to animate only when scrolling down and to prevent reanimation once completed.
 *
 * @param {IntersectionAnimationProps} props - Configuration properties for the hook.
 * @returns {Object} - The animation properties and functions.
 * @property {React.RefObject<HTMLDivElement>} ref - Ref to be attached to the target element.
 * @property {boolean} shouldAnimate - Whether the animation should be active.
 * @property {number} delay - Calculated delay before starting the animation.
 * @property {Function} animateDoneHandler - Handler to set the animation as completed.
 * @property {boolean} previouslyAnimated - Indicates if the element has previously animated.
 */
const useIntersectionAnimation = ({
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animateParam = true,
  noDelayOnIntersects = false,
  delayParam,
  onScrollDownOnly = true
}: IntersectionAnimationProps) => {
  const animateContext = useContext(AnimateContext)
  if (!animateContext)
    throw new Error('AnimateContext must be used within AnimateProvider')

  const {state, dispatch} = animateContext

  const previouslyAnimated = state.animateDone?.[animateKey] ?? false

  const animateDoneHandler = useCallback(() => {
    if (!alwaysAnimate) {
      dispatch(setAnimateDone(animateKey, true))
    }
  }, [dispatch, animateKey, alwaysAnimate])

  const ref = useRef<HTMLDivElement>(null)
  const [intersected, setIntersected] = useState(false)
  const [delay, setDelay] = useState(delayParam)
  const intersection = useIntersection(ref, {
    root,
    rootMargin
  })

  const scrollDirection = useScrollDirection() // Track scroll direction

  useEffect(() => {
    const isIntersecting = intersection?.isIntersecting
    // const isScrollingDown = scrollDirection === 'down'

    // Only trigger animation if intersecting, not previously animated, and scrolling down if the prop is true
    if (
      isIntersecting &&
      !intersected //&&
      // (!onScrollDownOnly || isScrollingDown || scrollDirection === null)
    ) {
      setIntersected(true)
      if (noDelayOnIntersects && delay && delay > 0) {
        const adjustedDelay =
          typeof noDelayOnIntersects === 'number'
            ? Math.max(0, delay - noDelayOnIntersects)
            : 0
        setDelay(adjustedDelay)
      }
    }
  }, [
    intersection,
    intersected,
    noDelayOnIntersects,
    delay,
    scrollDirection,
    onScrollDownOnly
  ])

  const shouldAnimate =
    animateParam && intersected && (alwaysAnimate || !previouslyAnimated)

  return {
    ref,
    shouldAnimate,
    delay,
    animateDoneHandler,
    previouslyAnimated,
    scrollDirection
  }
}

export default useIntersectionAnimation
