import {useEffect} from 'react'

const useInterval = (cb: () => any, interval: number = 1000) => {
  useEffect(() => {
    let id = setInterval(() => {
      cb()
    }, interval)
    return () => {
      clearInterval(id)
    }
  }, [cb, interval])
}
export default useInterval
