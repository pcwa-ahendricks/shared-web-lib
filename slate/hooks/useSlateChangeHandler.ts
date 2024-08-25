import {useCallback} from 'react'
import {type Descendant, type BaseEditor} from 'slate'
import {type ReactEditor} from 'slate-react'

/**
 * A custom hook that creates a change handler for a Slate.js editor.
 *
 * This hook provides a simple mechanism to handle changes in a Slate editor. It optionally calls an initial change handler
 * on every change and triggers an update handler when the editor's content changes (excluding selection changes).
 *
 * @param {Object} params - The parameters for the hook.
 * @param {BaseEditor & ReactEditor} params.editor - The Slate editor instance.
 * @param {(value: Descendant[]) => void} [params.updateHandler] - The function to handle updates immediately after a change occurs.
 * @param {(value: Descendant[]) => void} [params.initChangeHandler] - The function to handle changes initially, regardless of the operation type.
 *
 * @returns {(value: Descendant[]) => void} The change handler function that triggers the appropriate handlers based on the editor's state.
 *
 * @example
 * const changeHandler = useSlateChangeHandler({
 *   editor,
 *   updateHandler: (value) => saveToDatabase(value),
 *   initChangeHandler: (value) => logChange(value),
 * });
 *
 * <Slate editor={editor} value={initialValue} onChange={changeHandler}>
 *   ...
 * </Slate>
 */
export default function useSlateChangeHandler({
  editor,
  updateHandler,
  initChangeHandler
}: {
  editor: BaseEditor & ReactEditor
  updateHandler?: (value: Descendant[]) => void
  debouncedUpdateHandler?: (value: Descendant[]) => void
  initChangeHandler?: (value: Descendant[]) => void
  wait?: number
  maxWait?: number
}) {
  const changeHandler = useCallback(
    (value: Descendant[]) => {
      initChangeHandler?.(value) // call init function regardless of slate operation type
      const updated = editor.operations.some(
        (op) => 'set_selection' !== op.type
      )
      if (updated) {
        updateHandler?.(value) // fire immediately
      }
    },
    [updateHandler, initChangeHandler, editor]
  )
  return changeHandler
}
