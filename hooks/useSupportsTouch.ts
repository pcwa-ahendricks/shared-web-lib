import {useMediaQuery} from 'usehooks-ts'

const useSupportsTouch = () => {
  return useMediaQuery('(hover: none), (pointer: coarse)', {
    defaultValue: false,
    initializeWithValue: false
  })
}

export default useSupportsTouch
