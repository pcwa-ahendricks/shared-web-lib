import {useEffect, useState} from 'react'

export interface WindowSizeState {
  width: number
  height: number
}

const getWindowSize = (): WindowSizeState => {
  if (typeof window === 'undefined') {
    return {width: 0, height: 0}
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight
  }
}

const useWindowSize = (): WindowSizeState => {
  const [size, setSize] = useState<WindowSizeState>(getWindowSize)

  useEffect(() => {
    const updateSize = () => {
      setSize((prev: WindowSizeState) => {
        const next = getWindowSize()

        if (prev.width === next.width && prev.height === next.height) {
          return prev
        }

        return next
      })
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return size
}

export default useWindowSize
