// cspell:ignore touchevents
import {useState, useEffect} from 'react'

const useModernizr = () => {
  const [touchevents, setTouchevents] = useState<boolean | null>()

  useEffect(() => {
    try {
      if (Modernizr) {
        setTouchevents(Modernizr.touchevents)
      }
    } catch (error) {
      console.log(error)
      setTouchevents(null)
    }
  }, [])

  return {touchevents}
}

export default useModernizr
