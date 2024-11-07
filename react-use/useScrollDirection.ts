import {useState, useEffect} from 'react'
import {useWindowScroll} from 'react-use'

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
  const {y: scrollY} = useWindowScroll()
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null)
  const [lastScrollY, setLastScrollY] = useState(scrollY)

  useEffect(() => {
    if (scrollY > lastScrollY) {
      setScrollDirection('down')
    } else if (scrollY < lastScrollY) {
      setScrollDirection('up')
    }
    setLastScrollY(scrollY)
  }, [scrollY, lastScrollY])

  return scrollDirection
}

export default useScrollDirection
