import {useCallback} from 'react'
import {useRouter} from 'next/router'

const usePrefetchHandler = () => {
  const router = useRouter()
  // const classes = useStyles()
  const prefetchHandler = useCallback(
    (href: string) => {
      return () => {
        // Only works in production.
        if (href) {
          router.prefetch(href)
        }
      }
    },
    [router]
  )

  return prefetchHandler
}

export default usePrefetchHandler
