import {useMemo, useContext} from 'react'
import {PiContext} from '../PiStore'

const useIsReservoirGage = () => {
  const {state} = useContext(PiContext)
  const {activeGageItem} = state
  const isRiver = useMemo(
    () =>
      activeGageItem &&
      activeGageItem.baseElement === '\\\\BUSINESSPI2\\OPS\\Reservoirs'
        ? true
        : false,
    [activeGageItem]
  )

  return isRiver
}

export default useIsReservoirGage
