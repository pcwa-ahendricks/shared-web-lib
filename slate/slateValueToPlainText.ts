import {type Descendant, Node} from 'slate'

/**
 * Converts an array of Slate Descendant nodes into a plain text string.
 *
 * @param {Descendant[]} [value] - An optional array of Slate Descendant nodes representing the editor content.
 * @returns {string} The plain text representation of the Slate content. Returns an empty string if no value is provided.
 */
export default function slateValueToPlainText(value?: Descendant[]): string {
  return value?.map((node) => Node.string(node)).join('\n') || ''
}
