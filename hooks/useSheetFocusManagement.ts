'use client'

import {useCallback, useRef} from 'react'

/**
 * Focus management contract for Radix-backed sheet/dialog UIs whose open and
 * close behavior should differ between pointer and keyboard interaction.
 */
type UseSheetFocusManagementResult<T extends HTMLElement> = {
  /**
   * Attach this to the first meaningful interactive element inside the sheet.
   * Keyboard users are moved here on open so they get an immediate, visible
   * focus target.
   */
  initialFocusRef: React.RefObject<T | null>

  /**
   * Call from the trigger's pointer event handlers and any pointer-driven
   * controls inside the sheet.
   */
  handlePointerInteraction: () => void

  /**
   * Call from the trigger's keyboard event handlers and any keyboard-driven
   * controls inside the sheet.
   */
  handleKeyboardInteraction: () => void

  /**
   * Wire into Radix `onOpenAutoFocus`.
   */
  handleSheetOpenAutoFocus: (event: Event) => void

  /**
   * Wire into Radix `onCloseAutoFocus`.
   */
  handleSheetCloseAutoFocus: (event: Event) => void
}

/**
 * Manages Radix sheet auto-focus in a way that preserves keyboard accessibility
 * without showing unwanted focus styles for touch/pointer users.
 *
 * Why this exists:
 * Radix's default sheet/dialog behavior restores and redirects focus for
 * accessibility, which is correct in principle. On touch devices, especially
 * iOS Safari, that can also produce noisy visual states such as:
 * - a focus ring on the first sheet link immediately after opening
 * - focus returning to the trigger after navigation closes the sheet
 *
 * This hook tracks the user's last interaction modality and applies a split
 * strategy:
 * - Keyboard interaction: move focus to the first meaningful control on open
 *   and allow normal focus restoration on close.
 * - Pointer interaction: suppress Radix's visible autofocus on open and
 *   suppress trigger refocus on close.
 */
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
    // Pointer-driven opens should not show an artificial focus state inside the
    // sheet. Keyboard-driven opens should land on the first meaningful control.
    if (!shouldRestoreFocusRef.current) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    initialFocusRef.current?.focus()
  }, [])

  const handleSheetCloseAutoFocus = useCallback((event: Event) => {
    if (shouldRestoreFocusRef.current) return

    // When a pointer interaction closes the sheet, prevent Radix from sending
    // focus back to the trigger. Blurring the active element avoids a lingering
    // iOS/Safari outline during route transitions.
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
