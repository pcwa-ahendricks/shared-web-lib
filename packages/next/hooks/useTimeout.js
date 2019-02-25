// @flow
import {useEffect} from 'react'

const useTimeout = (
  cb: any,
  inputs: Array<any> = [],
  timeout: number = 100
) => {
  useEffect(() => {
    console.log('useEffect: should only run when props change')

    const timeoutId = setTimeout(() => {
      cb()
    }, timeout)

    return () => {
      clearTimeout(timeoutId)
    }
  }, inputs)
}

export default useTimeout
