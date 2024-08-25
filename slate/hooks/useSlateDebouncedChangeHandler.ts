import {useCallback, useEffect} from 'react'
import {type Descendant, type BaseEditor} from 'slate'
import {type ReactEditor} from 'slate-react'
import {useDebouncedCallback} from 'use-debounce'

/**
 * A custom hook that creates a debounced change handler for Slate.js editors, combining immediate and debounced updates.
 *
 * This hook provides a mechanism to handle changes in a Slate editor with both immediate and debounced updates.
 * It ensures that the editor's changes are handled efficiently, preventing excessive re-renders or updates by debouncing
 * the update handler while still allowing an initial change handler to run immediately.
 *
 * @param {Object} params - The parameters for the hook.
 * @param {BaseEditor & ReactEditor} params.editor - The Slate editor instance.
 * @param {(value: Descendant[]) => void} [params.updateHandler] - The function to handle updates immediately after a change occurs.
 * @param {(value: Descendant[]) => void} [params.debouncedUpdateHandler] - The function to handle debounced updates after changes.
 * @param {(value: Descendant[]) => void} [params.initChangeHandler] - The function to handle changes initially, regardless of the operation type.
 * @param {number} [params.wait=1000] - The debounce wait time in milliseconds.
 * @param {number} [params.maxWait=2000] - The maximum wait time in milliseconds before the debounced function is forced to execute.
 * @param {boolean} [params.flushOnUnmount=true] - Whether to flush the debounced function on component unmount.
 * @param {boolean} [params.cancelOnUnmount=true] - Whether to cancel the debounced function on component unmount.
 *
 * @returns {(value: Descendant[]) => void} The combined change handler function that integrates both immediate and debounced updates.
 *
 * @example
 * const changeHandler = useSlateDebouncedChangeHandler({
 *   editor,
 *   updateHandler: (value) => performSomeAction(value),
 *   debouncedUpdateHandler: (value) => saveToLocalStorage(value),
 * });
 *
 * <Slate editor={editor} value={initialValue} onChange={changeHandler}>
 *   ...
 * </Slate>
 */
export default function useSlateDebouncedChangeHandler({
  editor,
  updateHandler,
  debouncedUpdateHandler: debouncedUpdateHandlerParam = () => {},
  initChangeHandler,
  wait = 1000,
  maxWait = 2000,
  flushOnUnmount = true,
  cancelOnUnmount = true
}: {
  editor: BaseEditor & ReactEditor
  updateHandler?: (value: Descendant[]) => void
  debouncedUpdateHandler?: (value: Descendant[]) => void
  initChangeHandler?: (value: Descendant[]) => void
  wait?: number
  maxWait?: number
  flushOnUnmount?: boolean
  cancelOnUnmount?: boolean
}) {
  // Wrap saveHandler with useDebouncedCallback
  const debouncedUpdateHandler = useDebouncedCallback(
    debouncedUpdateHandlerParam,
    wait,
    {
      maxWait
    }
  )

  // combined change handler
  const changeHandler = useCallback(
    (value: Descendant[]) => {
      initChangeHandler?.(value) // call init function regardless of slate operation type
      const updated = editor.operations.some(
        (op) => 'set_selection' !== op.type
      )
      if (updated) {
        updateHandler?.(value) // fire immediately
        debouncedUpdateHandler(value) // Fire this with debounce
      }
    },
    [editor, initChangeHandler, updateHandler, debouncedUpdateHandler]
  )

  // Cancel the debounced function when the component unmounts
  useEffect(() => {
    return () => {
      if (flushOnUnmount) {
        debouncedUpdateHandler.flush()
      }
      if (cancelOnUnmount) {
        debouncedUpdateHandler.cancel()
      }
    }
  }, [debouncedUpdateHandler, flushOnUnmount, cancelOnUnmount])

  return changeHandler
}
