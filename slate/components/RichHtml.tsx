import React from 'react'
import {Descendant, Text} from 'slate'
import xss from 'xss'
import {Link} from '../../mui'
import {cn} from '../../_core'

type ElementKey =
  | 'paragraph'
  | 'blockquote'
  | 'bulleted-list'
  | 'numbered-list'
  | 'list-item'
  | 'link'
  | 'heading-one'
  | 'heading-two'
  | 'heading-three'
  | 'heading-four'
  | 'heading-five'
  | 'heading-six'

export type RichHtmlClassNames = Partial<Record<ElementKey, string>>

function serialize(
  node: Descendant,
  classNames: RichHtmlClassNames
): React.ReactNode {
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
          <React.Fragment key={index}>{serialize(child, classNames)}</React.Fragment>
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
        <blockquote
          className={cn('border-l-4 border-border pl-4 italic my-2', classNames.blockquote)}
        >
          {children}
        </blockquote>
      )
    case 'bulleted-list':
      return (
        <ul className={cn('list-disc pl-6 my-2', classNames['bulleted-list'])}>
          {children}
        </ul>
      )
    case 'heading-one':
      return (
        <h1 className={cn('font-heading text-4xl font-bold', classNames['heading-one'])}>
          {children}
        </h1>
      )
    case 'heading-two':
      return (
        <h2 className={cn('font-heading text-3xl font-bold', classNames['heading-two'])}>
          {children}
        </h2>
      )
    case 'heading-three':
      return (
        <h3 className={cn('font-heading text-2xl font-semibold', classNames['heading-three'])}>
          {children}
        </h3>
      )
    case 'heading-four':
      return (
        <h4 className={cn('font-heading text-xl font-semibold', classNames['heading-four'])}>
          {children}
        </h4>
      )
    case 'heading-five':
      return (
        <h5 className={cn('font-heading text-lg font-semibold', classNames['heading-five'])}>
          {children}
        </h5>
      )
    case 'heading-six':
      return (
        <h6 className={cn('font-heading text-base font-semibold', classNames['heading-six'])}>
          {children}
        </h6>
      )
    case 'list-item':
      return <li className={cn(classNames['list-item'])}>{children}</li>
    case 'numbered-list':
      return (
        <ol className={cn('list-decimal pl-6 my-2', classNames['numbered-list'])}>
          {children}
        </ol>
      )
    case 'paragraph':
      return (
        <p className={cn('my-2', classNames.paragraph)}>{children}</p>
      )
    case 'link': {
      const sanitizedUrl = xss(node.url ?? '')
      return (
        <Link
          href={sanitizedUrl}
          className={cn('text-primary hover:underline', classNames.link)}
        >
          {children}
        </Link>
      )
    }
    default:
      return <div>{children}</div>
  }
}

export default function RichHtml({
  data,
  classNames = {},
}: {
  data: Descendant[]
  classNames?: RichHtmlClassNames
}): React.ReactNode {
  return (
    <>
      {data.map((node, index) => (
        <React.Fragment key={index}>{serialize(node, classNames)}</React.Fragment>
      ))}
    </>
  )
}
