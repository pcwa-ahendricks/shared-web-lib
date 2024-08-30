import React from 'react'
import {Descendant, Text} from 'slate'
import DOMPurify from 'isomorphic-dompurify'
import {Typography, TypographyProps} from '@mui/material'

/**
 * `SimpleHtml` is a React component that serializes Slate.js data into sanitized HTML.
 * It uses Material-UI's `Typography` component to render the content, ensuring it's safe from XSS attacks.
 *
 * @param {object} props - The properties passed to the component.
 * @param {Descendant[]} props.data - The Slate.js document to be serialized into HTML.
 * @param {TypographyProps} props - Additional props to be passed to the `Typography` component.
 * @returns {JSX.Element} The serialized and sanitized HTML content rendered within the `Typography` component.
 *
 * @example
 * const slateData = [
 *   { type: 'paragraph', children: [{ text: 'Hello, world!' }] },
 *   { type: 'paragraph', children: [{ text: 'This is some text.' }] }
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
   *
   * @param {Descendant} node - The Slate.js node to be serialized.
   * @returns {React.ReactNode} The sanitized HTML content.
   */
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      // Sanitize the text content to ensure it's safe
      const cleanContent = DOMPurify.sanitize(node.text)

      // Return the sanitized content wrapped in the Typography component
      return (
        <Typography variant="inherit" component="div" {...props}>
          {cleanContent}
        </Typography>
      )
    }

    // Serialize children if the node is not a Text node
    if ('children' in node) {
      return (
        <>
          {node.children.map((node, index) => (
            <React.Fragment key={index}>{serialize(node)}</React.Fragment>
          ))}
        </>
      )
    }

    return null
  }

  return (
    <>
      {data.map((node, index) => (
        <React.Fragment key={index}>{serialize(node)}</React.Fragment>
      ))}
    </>
  )
}
