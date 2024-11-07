import {useEffect, useState, useRef} from 'react'
import {useIntersection} from 'react-use'

/**
 * Custom hook to detect when a target element, typically placed at the bottom of a scrollable container,
 * intersects with its parent element, indicating that the user has scrolled to the bottom.
 *
 * @template T - The HTML element type for the ref (e.g., HTMLDivElement).
 *
 * @returns {[React.RefObject<T>, boolean]} - A tuple with:
 *   - A ref object to attach to the target element.
 *   - A boolean that indicates whether the target element is currently intersecting, i.e., at the bottom of the scrollable area.
 *
 * @example
 * const [ref, isBottom] = useScrolledToBottomRef<HTMLDivElement>();
 *
 * // Attach `ref` to a target element at the bottom of the scrollable content
 * // and use `isBottom` to perform actions when the user scrolls to the bottom.
 */
const useScrolledToBottomRef = <T extends HTMLElement>(): [
  React.RefObject<T>,
  boolean
] => {
  const [isBottom, setIsBottom] = useState(false)
  const ref = useRef<T>(null)

  const intersection = useIntersection(ref, {
    root: ref.current?.parentElement || null
  })

  useEffect(() => {
    setIsBottom(!!intersection?.isIntersecting)
  }, [intersection])

  return [ref, isBottom]
}

export default useScrolledToBottomRef
