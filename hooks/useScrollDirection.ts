import {useEffect, useRef, useState} from 'react'
import {useEventListener} from 'usehooks-ts'

/**
 * Represents the direction of scroll.
 * @typedef {'up' | 'down' | null} ScrollDirection
 */
export type ScrollDirection = 'up' | 'down' | null

/**
 * Custom hook to determine the scroll direction ('up', 'down', or null).
 *
 * @returns {ScrollDirection} - The current scroll direction.
 *
 * @example
 * const scrollDirection = useScrollDirection()
 * console.log(scrollDirection) // 'up', 'down', or null
 */
const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    lastScrollY.current = window.scrollY
  }, [])

  useEventListener(
    'scroll',
    () => {
      const scrollY = window.scrollY

      if (scrollY > lastScrollY.current) {
        setScrollDirection('down')
      } else if (scrollY < lastScrollY.current) {
        setScrollDirection('up')
      }

      lastScrollY.current = scrollY
    },
    undefined,
    {passive: true}
  )

  return scrollDirection
}

export default useScrollDirection
