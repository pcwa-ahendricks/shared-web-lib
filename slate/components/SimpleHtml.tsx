import {Descendant, Text} from 'slate'
import xss from 'xss'
import {Typography, TypographyProps} from '@mui/material'

/**
 * Renders sanitized HTML content from an array of Slate.js `Descendant` nodes.
 * This component is designed to safely serialize and display text-based content.
 *
 * @param {Object} props - The props for the component.
 * @param {Descendant[]} props.data - An array of Slate.js `Descendant` nodes representing the content to render.
 * @param {TypographyProps} props - Additional MUI `Typography` properties for styling the rendered content.
 * @returns {React.ReactNode} The rendered and sanitized HTML content wrapped in a MUI `Typography` component.
 */
export default function SimpleHtml({
  data,
  ...props
}: {data: Descendant[]} & TypographyProps): React.ReactNode {
  /**
   * Serializes a Slate.js `Descendant` node into sanitized HTML.
   *
   * @param {Descendant} node - The Slate.js node to serialize.
   * @returns {React.ReactNode | null} The sanitized content or null if the node is invalid.
   */
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      // Sanitize the text content to ensure it's safe
      return xss(node.text)
    }

    // If the node has children, concatenate their content into a single string
    if ('children' in node) {
      const childrenText = node.children.map(serialize).join('')
      return childrenText
    }

    return null
  }

  // Concatenate all serialized nodes into a single string and wrap it with Typography
  const serializedContent = data?.map(serialize).join('')

  return (
    <Typography variant="inherit" component="div" {...props}>
      {serializedContent}
    </Typography>
  )
}
