// @flow

import {useEffect} from 'react'
const useInterval = (
  cb: () => any,
  interval: number = 1000,
  inputs: Array<any> = []
) => {
  useEffect(() => {
    let id = setInterval(() => {
      cb()
    }, interval)
    return () => {
      clearInterval(id)
    }
  }, inputs)
}
export default useInterval
