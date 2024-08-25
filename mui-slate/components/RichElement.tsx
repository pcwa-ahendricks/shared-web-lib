import {
  type HeadingElement,
  type CustomElement,
  type CustomRenderElementProps
} from '@/types/slate'
import {SxProps, Theme, Typography} from '@mui/material'

/**
 * Type guard function to check if a given element is a HeadingElement; aka, Type guard to narrow element to HeadingElement.
 *
 * @param {CustomElement} element - The element to check.
 * @returns {element is HeadingElement} True if the element is a HeadingElement, false otherwise.
 */
function isHeadingElement(element: CustomElement): element is HeadingElement {
  return element.type === 'heading'
}

/**
 * A `RichElement` component that renders different types of elements using Material-UI's `Typography` component.
 *
 * This component supports various element types such as headings, lists, and paragraphs, each of which is rendered
 * with appropriate HTML tags and styles. The component conditionally applies different `Typography` variants based
 * on the element's type and level.
 *
 * @param {CustomRenderElementProps} props - The props for rendering the element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the element.
 * @param {object} props.attributes - The attributes provided by Slate.js for the element.
 * @param {CustomElement} props.element - The element object containing type and style information.
 * @param {object} [props.slotProps] - Optional additional props to customize the styling of the element.
 * @returns {JSX.Element} The rendered `Typography` component based on the element's type and level.
 *
 * @example
 * <RichElement
 *   attributes={attributes}
 *   element={{ type: 'heading', level: 1, style: { color: 'blue' } }}
 * >
 *   Heading text
 * </RichElement>
 */
export default function RichElement({
  attributes,
  children,
  element,
  ...rest
}: CustomRenderElementProps) {
  const {style = {}, type} = element
  const level = isHeadingElement(element) ? element.level : null

  const {sx: sxParam = {}} = rest
  const sx: SxProps<Theme> = {
    ...sxParam
  }

  // Combine type and level only if level exists
  const elementCondition = level ? `${type}-${level}` : type

  switch (elementCondition) {
    case 'block-quote':
      return (
        <Typography
          variant="inherit"
          component="blockquote"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'bulleted-list':
      return (
        <Typography
          component="ul"
          variant="inherit"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-one':
      return (
        <Typography
          variant="h1"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-two':
      return (
        <Typography
          variant="h2"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-three':
      return (
        <Typography
          variant="h3"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-four':
      return (
        <Typography
          variant="h4"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-five':
      return (
        <Typography
          variant="h5"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'heading-six':
      return (
        <Typography
          variant="h6"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'list-item':
      return (
        <Typography
          component="li"
          variant="inherit"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'numbered-list':
      return (
        <Typography
          component="ol"
          variant="inherit"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    case 'paragraph':
      return (
        <Typography
          variant="inherit"
          paragraph
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
    // just let the undefined/un-level'ed headings return the default element
    // case 'heading':
    //   return (
    //     <Typography
    //       // variant="..."
    //       sx={sx}
    //       style={style}
    //       {...rest}
    //       {...attributes}
    //     >
    //       {children}
    //     </Typography>
    //   )
    default:
      return (
        <Typography
          variant="inherit"
          sx={sx}
          style={style}
          {...rest}
          {...attributes}
        >
          {children}
        </Typography>
      )
  }
}
