import {useState, useEffect} from 'react'
import {useWindowScroll, useWindowSize} from 'react-use'

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
  const {y: scrollY} = useWindowScroll()
  const {height: windowHeight} = useWindowSize()

  useEffect(() => {
    const scrolledToBottom =
      windowHeight + scrollY >=
      document.documentElement.scrollHeight - tolerance
    setIsBottom(scrolledToBottom)
  }, [scrollY, windowHeight, tolerance])

  return isBottom
}

export default useScrolledToBottom
