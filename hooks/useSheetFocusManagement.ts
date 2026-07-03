'use client'

import {useCallback, useRef} from 'react'

/**
 * Interaction type Base UI's dialog/sheet `initialFocus`/`finalFocus`
 * callbacks are invoked with. Kept as a local literal type instead of
 * importing `InteractionType` from `@base-ui/utils` (an undeclared
 * transitive dependency of `@base-ui/react`).
 */
type SheetInteractionType = 'mouse' | 'touch' | 'pen' | 'keyboard' | ''

type UseSheetFocusManagementResult<T extends HTMLElement> = {
  /**
   * Attach this to the first meaningful interactive element inside the sheet.
   * Keyboard users are moved here on open so they get an immediate, visible
   * focus target.
   */
  initialFocusRef: React.RefObject<T | null>

  /**
   * Wire into `SheetContent`'s `initialFocus`.
   */
  getInitialFocus: (openType: SheetInteractionType) => T | boolean | null

  /**
   * Wire into `SheetContent`'s `finalFocus`.
   */
  getFinalFocus: (closeType: SheetInteractionType) => boolean
}

/**
 * Manages Base UI sheet auto-focus in a way that preserves keyboard
 * accessibility without showing unwanted focus styles for touch/pointer users.
 *
 * Why this exists:
 * Base UI's default sheet/dialog behavior restores and redirects focus for
 * accessibility, which is correct in principle. On touch devices, especially
 * iOS Safari, that can also produce noisy visual states such as:
 * - a focus ring on the first sheet link immediately after opening
 * - focus returning to the trigger after navigation closes the sheet
 *
 * This hook applies a split strategy using Base UI's own per-interaction
 * `initialFocus`/`finalFocus` callbacks (each invoked with the interaction
 * type that triggered the open/close, so no manual pointer/keyboard tracking
 * is needed):
 * - Keyboard interaction: move focus to the first meaningful control on open
 *   and allow normal focus restoration on close.
 * - Pointer interaction (mouse/touch/pen): suppress Base UI's visible
 *   autofocus on open and suppress trigger refocus on close.
 */
const useSheetFocusManagement = <
  T extends HTMLElement
>(): UseSheetFocusManagementResult<T> => {
  const initialFocusRef = useRef<T | null>(null)

  const getInitialFocus = useCallback((openType: SheetInteractionType) => {
    if (openType !== 'keyboard') return false
    return initialFocusRef.current
  }, [])

  const getFinalFocus = useCallback((closeType: SheetInteractionType) => {
    if (closeType === 'keyboard') return true

    // Pointer-driven closes: prevent Base UI from sending focus back to the
    // trigger, and blur to avoid a lingering iOS/Safari outline during route
    // transitions.
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    return false
  }, [])

  return {
    initialFocusRef,
    getInitialFocus,
    getFinalFocus
  }
}

export default useSheetFocusManagement
