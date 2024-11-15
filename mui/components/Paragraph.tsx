import React from 'react'
import {Typography, type TypographyProps} from '@mui/material'

/**
 * `Paragraph` is a React component that renders its children as a paragraph
 * using Material-UI's `Typography` component. It uses the `sx` prop to apply
 * custom styles, making it compatible with React Server Components (RSC).
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Paragraph` component.
 *
 * @example
 * // Usage Example:
 * <Paragraph>This is a paragraph of text styled using Material-UI.</Paragraph>
 *
 * @returns {React.ReactNode} The rendered paragraph with custom styling.
 */
const Paragraph = ({children, sx, ...rest}: TypographyProps) => {
  return (
    <Typography
      component="p"
      variant="inherit"
      sx={{
        marginBottom: '1rem',
        lineHeight: 1.6,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Typography>
  )
}

const P = Paragraph
export {P, Paragraph as default}
