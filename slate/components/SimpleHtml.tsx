import React from 'react'
import {Descendant, Text} from 'slate'
import xss from 'xss'

function serialize(node: Descendant): string {
  if (Text.isText(node)) {
    return xss(node.text)
  }
  if ('children' in node) {
    return node.children.map(serialize).join('')
  }
  return ''
}

export default function SimpleHtml({data}: {data: Descendant[]}): React.ReactNode {
  return <>{data.map(serialize).join('')}</>
}
