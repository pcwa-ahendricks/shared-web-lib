'use client'

import {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {Box} from '@mui/material'
import {useIntersection} from 'react-use'
import {AnimateContext, setAnimateDone} from './AnimateContext'
import SlideInLeft, {type SlideInLeftProps} from '../SlideInLeft'

/**
 * Props for the `SlideInLeftIntersect` component, extending `FadeInProps`.
 * @interface SlideInLeftIntersectProps
 * @property {string} animateKey - Unique key to identify the animation state in the context.
 * @property {Element | null} [root] - Optional root element for the intersection observer.
 * @property {string} [rootMargin='0px'] - Margin around the root element for intersection calculations.
 * @property {boolean} [alwaysAnimate=false] - If true, forces the animation to play every time it enters view, regardless of context state.
 */
export interface SlideInLeftIntersectProps extends SlideInLeftProps {
  animateKey: string
  root?: Element | null
  rootMargin?: string
  alwaysAnimate?: boolean
}

/**
 * `SlideInLeftIntersect` component that triggers a slide-in animation from the left
 * when the component intersects with the viewport. The animation can be forced to
 * show every time with the `alwaysAnimate` prop.
 *
 * @param {SlideInLeftIntersectProps} props - The props for the component.
 * @returns {JSX.Element} The `SlideInLeftIntersect` component.
 */
const SlideInLeftIntersect = ({
  children,
  animateKey,
  root = null,
  rootMargin = '0px',
  alwaysAnimate = false,
  ...props
}: SlideInLeftIntersectProps) => {
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
  const intersection = useIntersection(ref, {
    root,
    rootMargin
  })

  useEffect(() => {
    const animate = intersection?.isIntersecting
    if (animate && !intersected) {
      setIntersected(true)
    }
  }, [intersection, intersected])

  // whether the component should animate, based on intersection and override logic. */
  const shouldAnimate = intersected && (alwaysAnimate || !previouslyAnimated)

  return (
    <Box ref={ref} sx={{display: 'inherit'}}>
      <SlideInLeft
        animate={shouldAnimate}
        onAnimationEnd={animateDoneHandler}
        {...props}
      >
        {children}
      </SlideInLeft>
    </Box>
  )
}

export default SlideInLeftIntersect
