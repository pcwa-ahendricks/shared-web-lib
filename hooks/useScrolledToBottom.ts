'use client'

import {useCallback, useSyncExternalStore} from 'react'

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
 * if (isBottom) {
 *   console.log("User has reached the bottom of the page!");
 * }
 */
const useScrolledToBottom = (tolerance: number = 5): boolean => {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('scroll', onChange, {passive: true})
    window.addEventListener('resize', onChange, {passive: true})
    return () => {
      window.removeEventListener('scroll', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [])

  const getSnapshot = useCallback(
    () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - tolerance,
    [tolerance]
  )

  const getServerSnapshot = useCallback(() => false, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export default useScrolledToBottom
