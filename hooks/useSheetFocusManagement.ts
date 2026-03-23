'use client'

import {useCallback, useRef} from 'react'

type UseSheetFocusManagementResult<T extends HTMLElement> = {
  initialFocusRef: React.RefObject<T | null>
  handlePointerInteraction: () => void
  handleKeyboardInteraction: () => void
  handleSheetOpenAutoFocus: (event: Event) => void
  handleSheetCloseAutoFocus: (event: Event) => void
}

const useSheetFocusManagement = <
  T extends HTMLElement
>(): UseSheetFocusManagementResult<T> => {
  const shouldRestoreFocusRef = useRef(false)
  const initialFocusRef = useRef<T | null>(null)

  const handlePointerInteraction = useCallback(() => {
    shouldRestoreFocusRef.current = false
  }, [])

  const handleKeyboardInteraction = useCallback(() => {
    shouldRestoreFocusRef.current = true
  }, [])

  const handleSheetOpenAutoFocus = useCallback((event: Event) => {
    if (!shouldRestoreFocusRef.current) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    initialFocusRef.current?.focus()
  }, [])

  const handleSheetCloseAutoFocus = useCallback((event: Event) => {
    if (shouldRestoreFocusRef.current) return

    event.preventDefault()

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, [])

  return {
    initialFocusRef,
    handlePointerInteraction,
    handleKeyboardInteraction,
    handleSheetOpenAutoFocus,
    handleSheetCloseAutoFocus
  }
}

export default useSheetFocusManagement
