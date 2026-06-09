import {Editor, Element, Transforms} from 'slate'

export function withStripLinks(editor: Editor): Editor {
  const {normalizeNode} = editor

  editor.normalizeNode = (entry) => {
    const [node, path] = entry

    if (Element.isElement(node) && node.type === 'link') {
      Transforms.unwrapNodes(editor, {at: path})
      return
    }

    normalizeNode(entry)
  }

  return editor
}
