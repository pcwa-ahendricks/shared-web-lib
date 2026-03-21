import {useEffect, useState} from 'react'

export interface WindowScrollState {
  x: number
  y: number
}

const getWindowScroll = (): WindowScrollState => {
  if (typeof window === 'undefined') {
    return {x: 0, y: 0}
  }

  return {
    x: window.scrollX,
    y: window.scrollY
  }
}

const useWindowScroll = (): WindowScrollState => {
  const [scroll, setScroll] = useState<WindowScrollState>(getWindowScroll)

  useEffect(() => {
    const updateScroll = () => {
      setScroll((prev: WindowScrollState) => {
        const next = getWindowScroll()

        if (prev.x === next.x && prev.y === next.y) {
          return prev
        }

        return next
      })
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, {passive: true})

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  }, [])

  return scroll
}

export default useWindowScroll
