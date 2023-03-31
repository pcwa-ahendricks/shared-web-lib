import {useMediaQuery} from '@mui/material'

const useMatchesIe = () => {
  const matchesIe = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )
  return matchesIe
}

export default useMatchesIe
