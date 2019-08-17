import {useEffect} from 'react'

const useTimeout = (cb: any, timeout = 100) => {
  useEffect(() => {
    console.log('useEffect: should only run when props change')

    const timeoutId = setTimeout(() => {
      cb()
    }, timeout)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [cb, timeout])
}

export default useTimeout
