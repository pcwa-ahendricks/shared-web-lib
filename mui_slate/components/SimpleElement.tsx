import {Typography} from '@mui/material'
import type {CustomRenderElementProps} from '../../slate/types/slate'

/**
 * A `SimpleElement` component that renders a Slate.js element using Material-UI's `Typography` component.
 *
 * This component provides a straightforward rendering of Slate.js elements, wrapping the content in a `div` element via MUI's `Typography` component.
 *
 * @param {CustomRenderElementProps} props - The props for rendering the element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the element.
 * @param {object} props.attributes - The attributes provided by Slate.js for the element.
 * @param {object} props.element - The element object containing type and other relevant information.
 * @param {object} [props.rest] - Additional props to customize the styling or behavior of the `Typography` component.
 * @returns {JSX.Element} The rendered `Typography` component with the content wrapped in a `div` element.
 *
 * @example
 * <SimpleElement attributes={attributes} element={element}>
 *   Simple content
 * </SimpleElement>
 */
export default function SimpleElement({
  attributes,
  children,
  element,
  ...rest
}: CustomRenderElementProps) {
  return (
    <Typography variant="inherit" component="div" {...rest} {...attributes}>
      {children}
    </Typography>
  )
}
