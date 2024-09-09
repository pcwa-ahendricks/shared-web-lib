import {Typography as Type, TypographyProps} from '@mui/material'
import {type RenderPlaceholderProps} from 'slate-react'

/**
 * Placeholder component for Slate editor using MUI's Typography.
 *
 * This component is intended to render a placeholder when there is no text content in the editor.
 * It combines Slate's `RenderPlaceholderProps` with MUI's `TypographyProps`.
 *
 * @param {RenderPlaceholderProps & TypographyProps} props - The combined props from Slate's placeholder and MUI's Typography.
 * @param {React.ReactNode} props.children - The content inside the Typography component (usually the placeholder text).
 * @param {React.HTMLAttributes<HTMLDivElement>} props.attributes - The HTML attributes passed by Slate for rendering the placeholder.
 * @param {React.CSSProperties} [props.attributes.style] - The style object for customizing the placeholder's appearance, including opacity.
 * @param {TypographyProps} rest - Any additional props for customizing MUI's Typography component.
 *
 * @returns {JSX.Element} A MUI `Typography` component that serves as the placeholder for the Slate editor.
 */
export default function Placeholder({
  sx: sxProp,
  children,
  attributes,
  ...rest
}: RenderPlaceholderProps & TypographyProps) {
  const {style, ...restAttributes} = attributes
  const sx = {...sxProp} as const
  return (
    <Type
      sx={(theme) => ({
        color: 'text.disabled',
        position: 'absolute',
        paddingY: 1.5,
        paddingRight: 3, // this one seems squishy, adjust as needed
        pointerEvents: 'none', // Disable events so it doesn't interfere with typing
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontFamily: theme.typography.body1.fontFamily,
        fontSize: theme.typography.body1.fontSize,
        ...sx
      })}
      style={{
        ...style,
        opacity: 1 // defaults to 0.333, see https://github.com/ianstormtaylor/slate/blob/main/packages/slate-react/src/components/leaf.tsx for more info.
      }}
      {...restAttributes}
      {...rest}
    >
      {children}
    </Type>
  )
}
