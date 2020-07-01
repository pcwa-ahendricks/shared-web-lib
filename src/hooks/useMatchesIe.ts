import {useMediaQuery} from '@material-ui/core'

const useMatchesIe = () => {
  const matchesIe = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )

  return matchesIe
}

export default useMatchesIe
