import {type TypographyProps} from '@mui/material'
import {type BaseText, type BaseElement} from 'slate'
import {type RenderElementProps, type RenderLeafProps} from 'slate-react'

type BlockType =
  | 'paragraph'
  | 'heading'
  | 'block-quote'
  | 'list-item'
  | 'bulleted-list'
  | 'numbered-list'
  | 'code-block'
  | 'link'
  | 'unknown' // fallback

type HeadingLevel = 'one' | 'two' | 'three' | 'four' | 'five' | 'six' // Use consistent level naming

// Extend the BaseElement to include type and style
interface CustomBaseElement extends BaseElement {
  type: BlockType
  style?: React.CSSProperties
}

// Extend the CustomBaseElement to include level for headings
export interface HeadingElement extends CustomBaseElement {
  type: 'heading'
  level?: HeadingLevel
}

// Extend BaseText to include custom formatting properties
export interface CustomText extends BaseText {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  style?: React.CSSProperties
}

// Union of different element types
export type CustomElement = HeadingElement | CustomBaseElement

export type CustomRenderLeafProps = RenderLeafProps & {
  leaf: CustomText
} & TypographyProps

export type CustomRenderElementProps = RenderElementProps & {
  element: CustomElement
} & TypographyProps