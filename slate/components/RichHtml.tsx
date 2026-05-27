import React from 'react'
import {Descendant, Text} from 'slate'
import xss from 'xss'
import {Link} from '../../next'

function serialize(node: Descendant): React.ReactNode {
  if (Text.isText(node)) {
    const cleanContent = xss(node.text)
    let textNode: React.ReactNode = <>{cleanContent}</>

    if (node.bold) {
      textNode = <strong className="font-semibold">{textNode}</strong>
    }
    if (node.code) {
      textNode = (
        <code className="font-mono bg-black/5 rounded px-1 py-0.5 text-[0.9em]">
          {textNode}
        </code>
      )
    }
    if (node.italic) {
      textNode = <em className="italic">{textNode}</em>
    }
    if (node.underline) {
      textNode = <u>{textNode}</u>
    }
    if (node.strikethrough) {
      textNode = <s>{textNode}</s>
    }

    return textNode
  }

  let children = <></>
  if ('children' in node) {
    children = (
      <>
        {node.children.map((child, index) => (
          <React.Fragment key={index}>{serialize(child)}</React.Fragment>
        ))}
      </>
    )
  }

  const elementCondition = node.level
    ? `${node.type}-${node.level}`
    : node.type

  switch (elementCondition) {
    case 'block-quote':
      return (
        <blockquote className="border-l-4 border-border pl-4 italic my-2">
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return <ul className="list-disc pl-6 my-2">{children}</ul>
    case 'heading-one':
      return <h1 className="font-heading text-4xl font-bold">{children}</h1>
    case 'heading-two':
      return <h2 className="font-heading text-3xl font-bold">{children}</h2>
    case 'heading-three':
      return <h3 className="font-heading text-2xl font-semibold">{children}</h3>
    case 'heading-four':
      return <h4 className="font-heading text-xl font-semibold">{children}</h4>
    case 'heading-five':
      return <h5 className="font-heading text-lg font-semibold">{children}</h5>
    case 'heading-six':
      return <h6 className="font-heading text-base font-semibold">{children}</h6>
    case 'list-item':
      return <li>{children}</li>
    case 'numbered-list':
      return <ol className="list-decimal pl-6 my-2">{children}</ol>
    case 'paragraph':
      return <p>{children}</p>
    case 'link': {
      const sanitizedUrl = xss(node.url ?? '')
      return (
        <Link href={sanitizedUrl} className="text-primary hover:underline">
          {children}
        </Link>
      )
    }
    default:
      return <div>{children}</div>
  }
}

export default function RichHtml({data}: {data: Descendant[]}): React.ReactNode {
  return (
    <>
      {data.map((node, index) => (
        <React.Fragment key={index}>{serialize(node)}</React.Fragment>
      ))}
    </>
  )
}
