import {useEffect} from 'react'

// Header toolbar is 48 pixels collapsed, but ideally a additional 20px margin would be added too
// See https://github.com/vercel/next.js/issues/11109#issuecomment-751429015
const useJumpTo = (offset = 20, timeout = 600) => {
  const headerOffset = 48

  useEffect(() => {
    const path = window.location.hash
    let t: NodeJS.Timeout
    if (path && path.includes('#')) {
      t = setTimeout(() => {
        const id = path.replace('#', '')
        const el = window.document.getElementById(id)
        const r = el?.getBoundingClientRect()
        window.top.scroll({
          top: pageYOffset + (r ? r.top : 0) - headerOffset - offset,
          behavior: 'smooth'
        })
      }, timeout)
    }
    return () => {
      if (t) {
        clearTimeout(t)
      }
    }
  }, [offset, timeout])
}

export default useJumpTo
