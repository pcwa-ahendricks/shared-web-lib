import {type Descendant, Node} from 'slate'

/**
 * Converts a Slate value (array of Descendant nodes) to plain text.
 *
 * This function takes a Slate editor value, which is an array of Descendant nodes,
 * and converts it to a plain text string. Each node's text content is extracted
 * and joined together with newline characters.
 *
 * @param {Descendant[]} value - The Slate value to convert, represented as an array of Descendant nodes.
 * @returns {string} The plain text representation of the Slate value.
 *
 * @example
 * const slateValue = [{ type: 'paragraph', children: [{ text: 'Hello, world!' }] }];
 * const plainText = slateValueToPlainText(slateValue);
 * console.log(plainText); // 'Hello, world!'
 */
export default function slateValueToPlainText(value: Descendant[]): string {
  return value.map((node) => Node.string(node)).join('\n')
}
