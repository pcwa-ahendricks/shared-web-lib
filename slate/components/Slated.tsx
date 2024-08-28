'use client'

import React, {useCallback, useEffect, useMemo} from 'react'
import {createEditor, type Descendant, Transforms, Node} from 'slate'
import {Slate, Editable, withReact} from 'slate-react'
import {Box} from '@mui/material'
import SimpleElement from './SimpleElement'
import SimpleLeaf from './SimpleLeaf'
import slateValueToPlainText from '../slateValueToPlainText'
import {
  type CustomRenderElementProps,
  type CustomRenderLeafProps
} from '../types'
import {EditableProps} from 'slate-react/dist/components/editable'
import RichElement from './RichElement'
import RichLeaf from './RichLeaf'

const defaultDefaultValue: Descendant[] = [
  {
    type: 'unknown',
    children: [{text: ''}]
  }
]

// const muiGridCellStyles: SxProps<Theme> = {
//   whiteSpace: 'nowrap',
//   overflow: 'hidden',
//   textOverflow: 'ellipsis'
// } as const

export default function Slated({
  data = defaultDefaultValue,
  showHtmlTitle = false,
  simple = false,
  ...props
}: {
  data?: Descendant[]
  showHtmlTitle?: boolean
  simple?: boolean
} & EditableProps) {
  // use a sensible default value with title (note, postgres creates a similar jsonb value by default when new rows are added so this isn't necessary, though, good practice)
  const {tabIndex} = props

  const editor = useMemo(() => withReact(createEditor()), [])

  const renderElement = useCallback(
    (props: CustomRenderElementProps) =>
      simple ? <SimpleElement {...props} /> : <RichElement {...props} />,
    [simple]
  )
  const renderLeaf = useCallback(
    (props: CustomRenderLeafProps) =>
      simple ? <SimpleLeaf {...props} /> : <RichLeaf {...props} />,
    [simple]
  )

  useEffect(() => {
    // Function to compare the editor's content with the new value
    const isEqual = (a: Node[], b: Node[]): boolean => {
      return JSON.stringify(a) === JSON.stringify(b)
    }

    // Only update if the content has actually changed
    if (!isEqual(editor.children, data)) {
      // Remove existing content
      Transforms.removeNodes(editor, {
        at: [0] // Adjust as necessary for your specific use case
      })

      // Insert the new content
      Transforms.insertNodes(editor, data, {
        at: [0] // Adjust as necessary for your specific use case
      })
    }
  }, [data, editor])

  const htmlTitle = slateValueToPlainText(data)

  return (
    <Box>
      <Slate editor={editor} initialValue={data}>
        <Box>
          <Editable
            {...(showHtmlTitle && {title: htmlTitle})}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            readOnly
            // TODO - not entirely sure tabIndex is working correctly
            tabIndex={tabIndex}
            {...props}
          />
        </Box>
      </Slate>
    </Box>
  )
}
