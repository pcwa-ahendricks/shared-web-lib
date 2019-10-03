import {useEffect} from 'react'
import {debounce} from 'debounce'

const useWindowScroll = (cbFunc: any, timeout = 100) => {
  useEffect(() => {
    const fn = debounce(cbFunc, timeout)
    window.addEventListener('scroll', fn)
    return () => {
      window.removeEventListener('scroll', fn)
    }
  }, [cbFunc, timeout])
}

export default useWindowScroll
