import {useState, useEffect} from 'react'
const isDev = process.env.NODE_ENV === 'development'

const useSupportsTouch = () => {
  const [supportsTouch, setSupportsTouch] = useState<boolean>()

  useEffect(() => {
    if ('ontouchstart' in window) {
      // iOS & android
      setSupportsTouch(true)
      isDev && console.log('Supports Touch: true')
    }
    // else if (window.navigator.msPointerEnabled) {
    //   // Win8
    //   setSupportsTouch(true)
    //   isDev && console.log('Supports Touch: true')
    // }
    else if ('ontouchstart' in document.documentElement) {
      // Controversial way to check touch support
      setSupportsTouch(true)
      isDev && console.log('Supports Touch: true')
    } else {
      setSupportsTouch(false)
      isDev && console.log('Supports Touch: false')
    }
  }, [])

  return supportsTouch
}

export default useSupportsTouch
