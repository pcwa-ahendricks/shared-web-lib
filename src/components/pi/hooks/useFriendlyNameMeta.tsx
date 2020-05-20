import {useMemo} from 'react'
import {PiMetadata} from '../PiStore'

const useFriendlyNameMeta = (meta: PiMetadata[] = []) => {
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
