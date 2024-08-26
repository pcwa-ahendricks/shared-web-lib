import {type SxProps, type Theme, Typography} from '@mui/material'
import Strong from '../../mui/components/Strong'
import Code from '../../mui/components/Code'
import type {CustomRenderLeafProps} from '../../slate/types/slate'

/**
 * A `RichLeaf` component that renders styled text based on Slate.js leaf properties.
 *
 * This component handles different text styles such as bold, italic, underline, strikethrough, and code.
 * It uses Material-UI's `Typography` component as a base and applies additional styles and components like `Strong` and `Code` for specific text formatting.
 *
 * @param {CustomRenderLeafProps} props - The props for rendering the leaf element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the leaf element.
 * @param {object} props.attributes - The attributes provided by Slate.js for the leaf element.
 * @param {object} props.leaf - The leaf object containing text styling information such as bold, italic, underline, etc.
 * @param {object} [props.slotProps] - Optional additional props to customize the styling of the leaf element.
 * @returns {JSX.Element} The rendered `Typography` component with applied text styles.
 *
 * @example
 * <RichLeaf
 *   attributes={attributes}
 *   leaf={{ bold: true, italic: true }}
 * >
 *   Rich text content
 * </RichLeaf>
 */
export default function RichLeaf({
  attributes,
  children,
  leaf,
  ...rest
}: CustomRenderLeafProps) {
  const {style = {}} = leaf
  const {sx: sxParam = {}} = rest
  const sx: SxProps<Theme> = {
    ...sxParam
  }

  if (leaf.bold) {
    children = <Strong weight="600">{children}</Strong>
  }

  if (leaf.code) {
    children = <Code>{children}</Code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.strikethrough) {
    children = <s>{children}</s>
  }

  return (
    <Typography
      variant="inherit"
      component="span"
      sx={sx}
      style={style}
      {...rest}
      {...attributes}
    >
      {children}
    </Typography>
  )
}
