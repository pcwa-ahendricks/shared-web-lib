import {useState, useEffect} from 'react'
import {useWindowScroll} from 'react-use'

type ScrollDirection = 'up' | 'down' | null

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
