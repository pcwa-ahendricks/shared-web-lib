import {useEffect} from 'react'
import {debounce} from 'debounce'

const useWindowResize = (cbFunc: any, timeout = 100) => {
  useEffect(() => {
    console.log('foo')
    const fn = debounce(cbFunc, timeout)
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('resize', fn)
    }
  }, [cbFunc, timeout])
}

export default useWindowResize
