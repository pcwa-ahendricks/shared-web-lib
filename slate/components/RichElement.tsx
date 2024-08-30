import {SxProps, Theme, Typography} from '@mui/material'
import type {CustomRenderElementProps} from '../../slate/types'
import {Link} from '../../next'
import {Variant} from '@mui/material/styles/createTypography'

/**
 * Interface representing the mapping for each element type to its corresponding HTML component and MUI variant.
 */
interface ElementMapping {
  component: string
  variant: Variant | 'inherit'
}

/**
 * An object that maps Slate element types to their corresponding HTML components and MUI typography variants.
 * This mapping is used to determine how each element type should be rendered.
 */
const elementMapping: Record<string, ElementMapping> = {
  'block-quote': {component: 'blockquote', variant: 'inherit'},
  'bulleted-list': {component: 'ul', variant: 'inherit'},
  'numbered-list': {component: 'ol', variant: 'inherit'},
  'list-item': {component: 'li', variant: 'inherit'},
  'heading-one': {component: 'h1', variant: 'h1'},
  'heading-two': {component: 'h2', variant: 'h2'},
  'heading-three': {component: 'h3', variant: 'h3'},
  'heading-four': {component: 'h4', variant: 'h4'},
  'heading-five': {component: 'h5', variant: 'h5'},
  'heading-six': {component: 'h6', variant: 'h6'},
  paragraph: {component: 'p', variant: 'inherit'},
  link: {component: 'a', variant: 'inherit'}
  // add more mappings as needed
}

/**
 * `RichElement` is a React component that renders different types of elements from Slate.js using Material-UI's `Typography` component.
 * It uses the `elementMapping` to map Slate element types to their corresponding HTML tags and MUI typography variants.
 * This component supports various element types such as headings, lists, paragraphs, and links, rendering them with appropriate styles.
 *
 * @param {CustomRenderElementProps} props - The props for rendering the element.
 * @param {object} props.attributes - The attributes provided by Slate.js for the element.
 * @param {React.ReactNode} props.children - The content to be rendered inside the element.
 * @param {CustomElement} props.element - The element object containing type and style information.
 * @returns {JSX.Element} The rendered element based on the provided type and level.
 */
export default function RichElement({
  attributes,
  children,
  element,
  ...props
}: CustomRenderElementProps) {
  const {style = {}, type, level} = element

  const {sx: sxParam = {}} = props
  const sx: SxProps<Theme> = {
    ...sxParam
  }

  const elementCondition = level ? `${type}-${level}` : type
  const mapping = elementMapping[elementCondition] || {
    component: 'div',
    variant: 'inherit'
  }

  if (type === 'link') {
    const {color, ...rest} = props // fix typescript warning about color
    return (
      <Link
        variant={mapping.variant}
        sx={sx}
        style={style}
        href={element.url ?? ''}
        {...rest}
        {...attributes}
      >
        {children}
      </Link>
    )
  }

  return (
    <Typography
      variant={mapping.variant}
      component={mapping.component}
      sx={sx}
      style={style}
      {...props}
      {...attributes}
    >
      {children}
    </Typography>
  )
}
