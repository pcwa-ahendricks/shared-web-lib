'use client'

import {useRef, type RefObject} from 'react'
import {useResizeObserver} from 'usehooks-ts'

const useElementSize = <T extends HTMLElement>(): readonly [
  RefObject<T | null>,
  {
    width: number
    height: number
  }
] => {
  const ref = useRef<T>(null)
  const {width = 0, height = 0} = useResizeObserver<T>({
    ref: ref as RefObject<T>,
    box: 'content-box'
  })

  return [ref, {width, height}] as const
}

export default useElementSize
