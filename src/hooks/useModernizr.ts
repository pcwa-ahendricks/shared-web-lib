// cspell:ignore touchevents
import {useState, useEffect} from 'react'

const useModernizr = () => {
  const [touchevents, setTouchevents] = useState<boolean | null>()

  useEffect(() => {
    try {
      // Just set touchevents once.
      if (Modernizr && !touchevents) {
        setTouchevents(Modernizr.touchevents)
      }
    } catch (error) {
      console.log(error)
      setTouchevents(null)
    }
  }, [touchevents])

  return {touchevents}
}

export default useModernizr
