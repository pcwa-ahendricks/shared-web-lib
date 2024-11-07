import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {useIntersection} from 'react-use'
import {AnimateContext, setAnimateDone} from '../components/AnimateContext'
import {useScrollDirection} from '../../react-use'

export interface IntersectionAnimationProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
  animate?: boolean
  noDelayOnIntersected?: boolean | number
  delay?: number
}

const useIntersectionAnimation = ({
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  animate = true,
  noDelayOnIntersected = false,
  delay
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
  const [adjustedDelay, setAdjustedDelay] = useState(delay)
  const intersection = useIntersection(ref, {
    root,
    rootMargin
  })

  const scrollDirection = useScrollDirection()
  const hasScrolled = !!scrollDirection

  useEffect(() => {
    const isIntersecting = intersection?.isIntersecting

    // Only trigger animation if intersecting and not previously animated
    if (isIntersecting && !intersected) {
      setIntersected(true)
      // Only adjust delay if noDelayOnIntersected was specified and user has scrolled (down or up) and delay is greater than 0
      if (noDelayOnIntersected && hasScrolled && delay && delay > 0) {
        const calcDelay =
          typeof noDelayOnIntersected === 'number'
            ? Math.max(0, delay - noDelayOnIntersected)
            : 0
        setAdjustedDelay(calcDelay)
      }
    }
  }, [intersection, intersected, noDelayOnIntersected, delay, hasScrolled])

  // only animate if the following is true:
  // The animate prop is true (the default for all components)
  const shouldAnimate =
    animate && (alwaysAnimate || !previouslyAnimated) && intersected

  return {
    ref,
    shouldAnimate,
    delay: adjustedDelay,
    animateDoneHandler,
    previouslyAnimated
  }
}

export default useIntersectionAnimation
