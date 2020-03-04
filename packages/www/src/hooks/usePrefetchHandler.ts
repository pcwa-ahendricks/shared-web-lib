import {useCallback} from 'react'
import {useRouter} from 'next/router'

const usePrefetchHandler = () => {
  const router = useRouter()
  // const classes = useStyles()
  const prefetchHandler = useCallback(
    (href: string) => {
      return () => {
        // Only works in production.
        // Don't try to prefetch bogus routes. Wrapping prefetch() with try/catch is not a work-around.
        if (href && !/^#$/.test(href)) {
          router.prefetch(href)
        }
      }
    },
    [router]
  )

  return prefetchHandler
}

export default usePrefetchHandler
