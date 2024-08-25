import {Box, BoxProps, Typography as Type, TypographyProps} from '@mui/material'
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
  return (
    <Box {...container} {...attributes}>
      <Type
        {...placeholder}
        // doesn't seem like any of this in necessary (as it is with Lexical)
        // sx={{
        //   pointerEvents: 'none', // Prevent interaction with the placeholder
        //   whiteSpace: 'nowrap',
        //   overflow: 'hidden',
        //   textOverflow: 'ellipsis'
        // }}
      >
        {children}
      </Type>
    </Box>
  )
}
