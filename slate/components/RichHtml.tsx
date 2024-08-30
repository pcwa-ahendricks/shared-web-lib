import React from 'react'
import {Descendant, Text} from 'slate'
import DOMPurify from 'isomorphic-dompurify'
import {Code, Strong} from '../../mui'
import {Typography, type TypographyProps} from '@mui/material'
import {Link, LinkProps} from '../../next'

/**
 * `RichHtml` is a React component that serializes Slate.js data into sanitized HTML.
 * It renders the content using Material-UI's `Typography` component and supports various text styles
 * such as bold, italic, code, underline, and strikethrough. It also handles different element types like
 * headings, lists, paragraphs, and links, ensuring they are properly sanitized and rendered.
 *
 * @param {object} props - The properties passed to the component.
 * @param {Descendant[]} props.data - The Slate.js document to be serialized into HTML.
 * @param {TypographyProps} props - Additional props to be passed to the `Typography` component.
 * @param {Partial<LinkProps>} props - Partial props to be passed to the `Link` component, specifically for handling links.
 * @returns {JSX.Element} The serialized and sanitized HTML content rendered with various HTML tags.
 *
 * @example
 * const slateData = [
 *   { type: 'paragraph', children: [{ text: 'Hello, world!', bold: true }] },
 *   { type: 'heading-one', children: [{ text: 'This is a heading.' }] },
 *   { type: 'link', url: 'https://example.com', children: [{ text: 'Visit example.com' }] }
 * ];
 *
 * <RichHtml data={slateData} variant="body1" />
 */
export default function RichHtml({
  data,
  ...props
}: {data: Descendant[]} & TypographyProps & Partial<LinkProps>): JSX.Element {
  /**
   * Serializes a Slate.js node into sanitized HTML using `DOMPurify`.
   * Handles different text styles and element types like bold, italic, code, and links.
   *
   * @param {Descendant} node - The Slate.js node to be serialized.
   * @returns {React.ReactNode} The sanitized HTML content.
   */
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      // Sanitize the text content to ensure it's safe
      const cleanContent = DOMPurify.sanitize(node.text)
      if (node.bold) {
        return (
          <Strong variant="inherit" weight="600" {...props}>
            {cleanContent}
          </Strong>
        )
      }

      if (node.code) {
        return (
          <Code variant="inherit" {...props}>
            {cleanContent}
          </Code>
        )
      }

      if (node.italic) {
        return (
          <Typography variant="inherit" component="em" {...props}>
            {cleanContent}
          </Typography>
        )
      }

      if (node.underline) {
        return (
          <Typography variant="inherit" component="u" {...props}>
            {cleanContent}
          </Typography>
        )
      }

      if (node.strikethrough) {
        return (
          <Typography variant="inherit" component="s" {...props}>
            {cleanContent}
          </Typography>
        )
      }

      return <>{cleanContent}</>
    }

    let children = <></>

    // Serialize children if the node is not a Text node
    if ('children' in node) {
      children = (
        <>
          {node.children.map((node, index) => (
            <React.Fragment key={index}>{serialize(node)}</React.Fragment>
          ))}
        </>
      )
    }

    // Combine type and level only if level exists
    const elementCondition = node.level
      ? `${node.type}-${node.level}`
      : node.type

    switch (elementCondition) {
      case 'block-quote':
        return (
          <Typography variant="inherit" component="blockquote" {...props}>
            {children}
          </Typography>
        )
      case 'bulleted-list':
        return (
          <Typography variant="inherit" component="ul" {...props}>
            {children}
          </Typography>
        )
      case 'heading-one':
        return (
          <Typography variant="h1" {...props}>
            {children}
          </Typography>
        )
      case 'heading-two':
        return (
          <Typography variant="h2" {...props}>
            {children}
          </Typography>
        )
      case 'heading-three':
        return (
          <Typography variant="h3" {...props}>
            {children}
          </Typography>
        )
      case 'heading-four':
        return (
          <Typography variant="h4" {...props}>
            {children}
          </Typography>
        )
      case 'heading-five':
        return (
          <Typography variant="h5" {...props}>
            {children}
          </Typography>
        )
      case 'heading-six':
        return (
          <Typography variant="h6" {...props}>
            {children}
          </Typography>
        )
      case 'list-item':
        return (
          <Typography variant="inherit" component="li" {...props}>
            {children}
          </Typography>
        )
      case 'numbered-list':
        return (
          <Typography variant="inherit" component="ol" {...props}>
            {children}
          </Typography>
        )
      case 'paragraph':
        return (
          <Typography
            variant="inherit"
            component="p"
            className="bar"
            {...props}
          >
            {children}
          </Typography>
        )
      case 'link':
        // Ensure URL is treated as a string and sanitize it
        const sanitizedUrl = DOMPurify.sanitize(node.url ?? '')
        return (
          <Link variant="inherit" href={sanitizedUrl} {...props}>
            {children}
          </Link>
        )
      default:
        // Return sanitized children
        return (
          <Typography component="div" variant="inherit" {...props}>
            {children}
          </Typography>
        )
    }
  }

  return (
    <>
      {data.map((node, index) => (
        <React.Fragment key={index}>{serialize(node)}</React.Fragment>
      ))}
    </>
  )
}
