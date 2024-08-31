import React from 'react'
import {Descendant, Text} from 'slate'
import DOMPurify from 'isomorphic-dompurify'
import {Typography, TypographyProps} from '@mui/material'

/**
 * `SimpleHtml` is a React component that serializes Slate.js data into sanitized HTML.
 * It renders the content using Material-UI's `Typography` component, ensuring that
 * all text nodes are sanitized for safety.
 *
 * @param {object} props - The properties passed to the component.
 * @param {Descendant[]} props.data - The Slate.js document to be serialized into HTML.
 * @param {TypographyProps} props - Additional props to be passed to the `Typography` component.
 * @returns {JSX.Element} The serialized and sanitized HTML content rendered with Material-UI's `Typography`.
 *
 * @example
 * const slateData = [
 *   { type: 'paragraph', children: [{ text: 'Hello, world!' }] },
 *   { type: 'heading-one', children: [{ text: 'This is a heading.' }] }
 * ];
 *
 * <SimpleHtml data={slateData} variant="body1" />
 */
export default function SimpleHtml({
  data,
  ...props
}: {data: Descendant[]} & TypographyProps): JSX.Element {
  /**
   * Serializes a Slate.js node into sanitized HTML using `DOMPurify`.
   * Handles text nodes by sanitizing their content, and concatenates
   * all children into a single string for block elements.
   *
   * @param {Descendant} node - The Slate.js node to be serialized.
   * @returns {React.ReactNode} The sanitized HTML content.
   */
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      // Sanitize the text content to ensure it's safe
      return DOMPurify.sanitize(node.text)
    }

    // If the node has children, concatenate their content into a single string
    if ('children' in node) {
      const childrenText = node.children.map(serialize).join('')
      return childrenText
    }

    return null
  }

  // Concatenate all serialized nodes into a single string and wrap it with Typography
  const serializedContent = data.map(serialize).join('')

  return (
    <Typography variant="inherit" component="div" {...props}>
      {serializedContent}
    </Typography>
  )
}
