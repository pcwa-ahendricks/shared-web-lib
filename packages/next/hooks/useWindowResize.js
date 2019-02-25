// @flow
import {useEffect} from 'react'
import debounce from '../lib/debounce'

const useWindowResize = (
  cbFunc: any,
  inputs: Array<any> = [],
  timeout: number = 100
) => {
  useEffect(() => {
    const fn = debounce(cbFunc, timeout)
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('resize', fn)
    }
  }, inputs)
}

export default useWindowResize
