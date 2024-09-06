import {
  Box,
  BoxProps,
  Typography as Type,
  TypographyProps,
  useTheme
} from '@mui/material'
import colorAlpha from 'color-alpha'
import {type RenderPlaceholderProps} from 'slate-react'

/**
 * A `Placeholder` component for Slate.js, utilizing Material-UI's `Box` and `Typography` components.
 *
 * This component renders a placeholder within a Slate.js editor, with optional styling and props
 * for both the container (`Box`) and the placeholder text (`Typography`).
 * For non-Mui example see https://github.com/ianstormtaylor/slate/blob/main/site/examples/custom-placeholder.tsx
 *
 * @param {RenderPlaceholderProps & { slotProps?: { container?: BoxProps; placeholder?: TypographyProps } }} props - The props for the `Placeholder` component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the placeholder, typically text.
 * @param {object} props.attributes - The attributes provided by Slate.js for the placeholder element.
 * @param {object} [props.slotProps] - Optional props for customizing the container and placeholder elements.
 * @param {BoxProps} [props.slotProps.container] - Custom props for the `Box` container element.
 * @param {TypographyProps} [props.slotProps.placeholder] - Custom props for the `Typography` placeholder element.
 * @returns {JSX.Element} The rendered `Placeholder` component.
 *
 * @example
 * <Placeholder attributes={attributes} slotProps={{ container: { sx: { padding: '8px' } }, placeholder: { sx: { color: 'gray' } } }}>
 *   Enter some text...
 * </Placeholder>
 */
export default function Placeholder({
  children,
  attributes,
  slotProps
}: RenderPlaceholderProps & {
  slotProps?: {container?: BoxProps; placeholder?: TypographyProps}
}) {
  const {container, placeholder} = slotProps ?? {}
  const theme = useTheme()
  const {style, ...restAttributes} = attributes
  return (
    <Box
      {...container}
      style={{
        ...style,
        opacity: 1 // defaults to 0.333, see https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/leaf.tsx for more info.
      }}
      {...restAttributes}
    >
      <Type
        {...placeholder}
        sx={{
          color: colorAlpha(theme.palette.text.primary, 0.6),
          position: 'absolute',
          paddingY: theme.spacing(1.5),
          pointerEvents: 'none', // Disable events so it doesn't interfere with typing
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body1.fontSize,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {children}
      </Type>
    </Box>
  )
}
