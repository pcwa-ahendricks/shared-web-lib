import {Typography} from '@mui/material'
import type {CustomRenderLeafProps} from '../../slate/types'

/**
 * A `SimpleLeaf` component that renders a Slate.js leaf node using Material-UI's `Typography` component.
 *
 * This component is designed to render the text content of a Slate.js leaf node without additional styling or transformations,
 * wrapping the content in a `span` element via MUI's `Typography` component.
 *
 * @param {CustomRenderLeafProps} props - The props for rendering the leaf node.
 * @param {React.ReactNode} props.children - The text content to be rendered inside the leaf node.
 * @param {object} props.attributes - The attributes provided by Slate.js for the leaf node.
 * @param {object} props.leaf - The leaf object containing text content and formatting information.
 * @param {object} [props.rest] - Additional props to customize the styling or behavior of the `Typography` component.
 * @returns {JSX.Element} The rendered `Typography` component with the text content wrapped in a `span` element.
 *
 * @example
 * <SimpleLeaf attributes={attributes} leaf={leaf}>
 *   Simple text content
 * </SimpleLeaf>
 */
export default function SimpleLeaf({
  attributes,
  children,
  leaf,
  ...rest
}: CustomRenderLeafProps) {
  return (
    <Typography variant="inherit" component="span" {...rest} {...attributes}>
      {children}
    </Typography>
  )
}
