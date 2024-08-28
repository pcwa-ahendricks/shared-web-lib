import {Typography as Type, TypographyProps} from '@mui/material'
import {grey} from '@mui/material/colors'
import alpha from 'color-alpha'

/**
 * A custom `Code` component that wraps MUI's `Typography` component, rendering text with code styling.
 *
 * The component uses the `code` HTML tag and applies a monospace font, a light grey background color, and padding to give the appearance of inline code.
 *
 * @param {TypographyProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Code` component.
 * @param {object} [props.sx] - The style overrides for the component, extending MUI's `sx` prop.
 * @returns {JSX.Element} The rendered `Code` component with the specified styling.
 *
 * @example
 * <Code>
 *   const x = 10;
 * </Code>
 */
export default function Code({children, sx, ...rest}: TypographyProps) {
  return (
    <Type
      component="code"
      sx={{
        // mui alpha requires 'use client' directive so we are just using color-alpha instead
        backgroundColor: alpha(grey['200'], 0.95),
        fontFamily: 'monospace',
        paddingY: '1px',
        paddingX: '3px',
        ...sx
      }}
      variant="inherit"
      {...rest}
    >
      {children}
    </Type>
  )
}
