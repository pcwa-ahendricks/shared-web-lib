import {useMemo, useContext} from 'react'
import {PiContext} from '../PiStore'

const useFriendlyNameMeta = () => {
  const {state} = useContext(PiContext)
  const {streamSetMeta: meta} = state
  const friendlyName = useMemo(() => {
    const f = meta.find(
      (m) => m.name && m.name && m.name.match(/friendly\s?name/i)
    )
    const v = f && f.value
    return v ? v.toString() : ''
  }, [meta])

  return friendlyName
}

export default useFriendlyNameMeta
