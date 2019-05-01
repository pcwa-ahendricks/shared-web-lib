import {useEffect} from 'react'
import debounce from '../lib/debounce'

const useWindowScroll = (
  cbFunc: any,
  inputs: Array<any> = [],
  timeout: number = 100
) => {
  useEffect(() => {
    const fn = debounce(cbFunc, timeout)
    window.addEventListener('scroll', fn)
    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [cbFunc, timeout, ...inputs])
}

export default useWindowScroll
