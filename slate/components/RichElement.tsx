import {SxProps, Theme, Typography} from '@mui/material'
import type {CustomRenderElementProps} from '../../slate/types'
import {Link} from '../../next'

/**
 * `RichElement` is a React component that renders Slate.js elements using Material-UI's `Typography` component.
 * It supports various types of elements like block quotes, lists, headings, paragraphs, and links. The component
 * dynamically determines the appropriate HTML element and MUI typography variant based on the type and level of the element.
 *
 * @param {object} props - The properties passed to the component.
 * @param {CustomRenderElementProps} props.attributes - Attributes applied to the element, typically from Slate.js.
 * @param {React.ReactNode} props.children - The child nodes to be rendered inside the element.
 * @param {object} props.element - The Slate.js element object containing type, level, and other properties.
 * @param {object} props.element.style - Optional inline styles applied to the element.
 * @param {string} props.element.type - The type of the Slate.js element (e.g., 'paragraph', 'heading-one').
 * @param {number} [props.element.level] - The level of the element, used for differentiating heading levels.
 * @param {SxProps<Theme>} props.sx - MUI `sx` prop for applying custom styles to the component.
 * @param {TypographyProps} props - Additional props passed to the `Typography` or `Link` component.
 *
 * @returns {JSX.Element} The rendered Slate.js element as a MUI `Typography` or `Link` component.
 *
 * @example
 * <RichElement
 *   attributes={attributes}
 *   element={{ type: 'heading-one', level: 1, style: { color: 'blue' } }}
 * >
 *   This is a heading
 * </RichElement>
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

  switch (elementCondition) {
    case 'block-quote':
      return (
        <Typography
          component="blockquote"
          variant="inherit"
          sx={sx}
          style={style}
          {...props}
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
          {...props}
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
          {...props}
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
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-one':
      return (
        <Typography
          component="h1"
          variant="h1"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-two':
      return (
        <Typography
          component="h2"
          variant="h2"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-three':
      return (
        <Typography
          component="h3"
          variant="h3"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-four':
      return (
        <Typography
          component="h4"
          variant="h4"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-five':
      return (
        <Typography
          component="h5"
          variant="h5"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'heading-six':
      return (
        <Typography
          component="h6"
          variant="h6"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'paragraph':
      return (
        <Typography
          component="p"
          variant="inherit"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )

    case 'link':
      const {color, ...rest} = props // Fix TypeScript warning about color
      return (
        <Link
          variant="inherit"
          sx={sx}
          style={style}
          href={element.url ?? ''}
          {...rest}
          {...attributes}
        >
          {children}
        </Link>
      )

    default:
      return (
        <Typography
          component="div"
          variant="inherit"
          sx={sx}
          style={style}
          {...props}
          {...attributes}
        >
          {children}
        </Typography>
      )
  }
}
