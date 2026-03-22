'use client'

import {useCallback, useEffect, useState} from 'react'
import {useEventListener, useWindowSize} from 'usehooks-ts'

/**
 * Custom hook that detects if the user has scrolled to the bottom of the page,
 * with a small tolerance to handle rounding issues.
 *
 * @param {number} [tolerance=5] - The tolerance in pixels for detecting bottom scroll.
 * @returns {boolean} - A boolean indicating whether the user has scrolled to the bottom of the page.
 *
 * @example
 * const isBottom = useScrolledToBottom();
 *
 * useEffect(() => {
 *   if (isBottom) {
 *     console.log("User has reached the bottom of the page!");
 *   }
 * }, [isBottom]);
 */
const useScrolledToBottom = (tolerance: number = 5): boolean => {
  const [isBottom, setIsBottom] = useState(false)
  const {height: windowHeight} = useWindowSize()

  const updateIsBottom = useCallback(() => {
    if (typeof window === 'undefined') {
      setIsBottom(false)
      return
    }

    const scrolledToBottom =
      windowHeight + window.scrollY >=
      document.documentElement.scrollHeight - tolerance

    setIsBottom(scrolledToBottom)
  }, [tolerance, windowHeight])

  useEffect(() => {
    updateIsBottom()
  }, [updateIsBottom])

  useEventListener('scroll', updateIsBottom, undefined, {passive: true})

  return isBottom
}

export default useScrolledToBottom
