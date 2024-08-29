import React from 'react'
import {type Descendant, Text} from 'slate'
import DOMPurify from 'dompurify'

export default function SimpleHtml({data}: {data: Descendant[]}): JSX.Element {
  const serialize = (node: Descendant): React.ReactNode => {
    if (Text.isText(node)) {
      let textContent = node.text
      if (node.bold) {
        return <strong>{textContent}</strong>
      }
      return textContent
    }

    const children = node.children.map((n, i) => (
      <React.Fragment key={i}>{serialize(n)}</React.Fragment>
    ))

    switch (node.type) {
      case 'quote':
        return (
          <blockquote>
            <p>{children}</p>
          </blockquote>
        )
      case 'paragraph':
        return <p>{children}</p>
      case 'link':
        return <a href={DOMPurify.sanitize((node as any).url)}>{children}</a>
      default:
        return <>{children}</>
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
