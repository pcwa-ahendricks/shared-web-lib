import {useMemo, useContext} from 'react'
import {PiContext} from '../PiStore'

const useIsRiverGage = () => {
  const {state} = useContext(PiContext)
  const {activeGageItem} = state
  const isRiver = useMemo(
    () => (activeGageItem && activeGageItem.type === 'gage' ? true : false),
    [activeGageItem]
  )

  return isRiver
}

export default useIsRiverGage
