import {useEffect, useState} from 'react'
import {ReactEditor, useSlate} from 'slate-react'

/**
 * Custom hook to determine whether the Slate editor is currently focused.
 *
 * @returns {boolean} `true` if the editor is focused, `false` otherwise.
 *
 * @example
 * const isFocused = useIsEditorFocused();
 * console.log(isFocused); // Logs true if the editor is focused, false otherwise.
 */
export default function useIsEditorFocused() {
  const editor = useSlate()
  const [isFocused, setIsFocused] = useState(ReactEditor.isFocused(editor))

  useEffect(() => {
    /**
     * Handles the focus event by setting the isFocused state to true.
     */
    const handleFocus = () => setIsFocused(true)

    /**
     * Handles the blur event by setting the isFocused state to false.
     */
    const handleBlur = () => setIsFocused(false)

    // Get the DOM node for the Slate editor.
    const element = ReactEditor.toDOMNode(editor, editor)

    // Add focus and blur event listeners to the editor's DOM node.
    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    // Cleanup event listeners on component unmount.
    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [editor])

  return isFocused
}
