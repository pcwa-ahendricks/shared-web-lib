import {useEffect, useState} from 'react'
import {ReactEditor, useSlate} from 'slate-react'

export const useIsEditorFocused = () => {
  const editor = useSlate()
  const [isFocused, setIsFocused] = useState(ReactEditor.isFocused(editor))

  useEffect(() => {
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const element = ReactEditor.toDOMNode(editor, editor)
    element.addEventListener('focus', handleFocus)
    element.addEventListener('blur', handleBlur)

    // Cleanup event listeners on unmount
    return () => {
      element.removeEventListener('focus', handleFocus)
      element.removeEventListener('blur', handleBlur)
    }
  }, [editor])

  return isFocused
}
