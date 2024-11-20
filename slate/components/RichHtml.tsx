import React from 'react'
import {Descendant, Text} from 'slate'
import xss from 'xss'
import {Code, Em, Strong} from '../../mui'
import {Typography, type TypographyProps} from '@mui/material'
import {Link, LinkProps} from '../../next'

/**
 * Renders rich HTML content from Slate.js `Descendant` nodes.
 * This component ensures sanitized and styled output for different types of Slate nodes.
 *
 * @param {Object} props - The props for the component.
 * @param {Descendant[]} props.data - The Slate.js content to render.
 * @param {TypographyProps} [props] - Additional MUI Typography properties to style the rendered content.
 * @param {Partial<LinkProps>} [props] - Additional MUI Link properties to style links in the rendered content.
 * @returns {React.ReactNode} The rendered HTML content.
 */
export default function RichHtml({
  data,
  ...props
}: {data: Descendant[]} & TypographyProps &
  Partial<LinkProps>): React.ReactNode {
  /**
   * Serializes a Slate.js `Descendant` node into a React component.
   *
   * @param {Descendant} node - The Slate.js node to serialize.
   * @returns {React.ReactNode} The rendered React node.
   */
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      // Sanitize the text content to ensure it's safe
      const cleanContent = xss(node.text)
      let textNode = <>{cleanContent}</>

      if (node.bold) {
        textNode = (
          <Strong variant="inherit" {...props}>
            {textNode}
          </Strong>
        )
      }

      if (node.code) {
        textNode = (
          <Code variant="inherit" {...props}>
            {textNode}
          </Code>
        )
      }

      if (node.italic) {
        textNode = (
          <Em variant="inherit" {...props}>
            {textNode}
          </Em>
        )
      }

      if (node.underline) {
        textNode = (
          <Typography variant="inherit" component="u" {...props}>
            {textNode}
          </Typography>
        )
      }

      if (node.strikethrough) {
        textNode = (
          <Typography variant="inherit" component="s" {...props}>
            {textNode}
          </Typography>
        )
      }

      // Return the fully constructed text node
      return textNode
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
        const sanitizedUrl = xss(node.url ?? '')
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
