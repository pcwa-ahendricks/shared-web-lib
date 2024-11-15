import React from 'react'
import {Typography as Type, type TypographyProps} from '@mui/material'

/**
 * `Strong` is a React component that renders its children with a bold font weight
 * using Material-UI's `Typography` component. It uses the `sx` prop to style the text,
 * making it compatible with React Server Components (RSC).
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Strong` component.
 *
 * @example
 * // Usage Example:
 * <Strong>This text will be bold.</Strong>
 *
 * @returns {JSX.Element} The rendered text with bold styling.
 */
export default function Strong({children, sx, ...rest}: TypographyProps) {
  return (
    <Type
      component="strong"
      variant="inherit"
      sx={{fontWeight: 600, ...sx}}
      {...rest}
    >
      {children}
    </Type>
  )
}
