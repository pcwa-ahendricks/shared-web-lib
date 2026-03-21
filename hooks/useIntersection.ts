import {useEffect, useState, type RefObject} from 'react'

export interface UseIntersectionOptions extends IntersectionObserverInit {
  root?: Element | Document | null
}

const useIntersection = <T extends Element>(
  ref: RefObject<T | null>,
  options: UseIntersectionOptions = {}
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const {root = null, rootMargin, threshold} = options

  useEffect(() => {
    const node = ref.current

    if (!node || typeof IntersectionObserver === 'undefined') {
      setEntry(undefined)
      return
    }

    const observer = new IntersectionObserver(
      ([nextEntry]) => {
        setEntry(nextEntry)
      },
      {
        root,
        rootMargin,
        threshold
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [ref, root, rootMargin, threshold])

  return entry
}

export default useIntersection
