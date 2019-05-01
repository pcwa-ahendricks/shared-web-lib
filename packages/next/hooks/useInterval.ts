import {useEffect} from 'react'

const useInterval = (
  cb: () => any,
  inputs: Array<any> = [],
  interval: number = 1000
) => {
  useEffect(() => {
    let id = setInterval(() => {
      cb()
    }, interval)
    return () => {
      clearInterval(id)
    }
  }, [cb, interval, ...inputs])
}
export default useInterval
