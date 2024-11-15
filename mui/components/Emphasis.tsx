import React from 'react'
import {Typography, type TypographyProps} from '@mui/material'

/**
 * `Emphasis` is a React component that renders its children with an italic font style
 * using Material-UI's `Typography` component. It uses the `sx` prop for styling,
 * making it compatible with React Server Components (RSC).
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Emphasis` component.
 *
 * @example
 * // Usage Example:
 * <Emphasis>This text will be italicized.</Emphasis>
 *
 * @returns {React.ReactNode} The rendered text with italic styling.
 */
const Emphasis = ({children, sx, ...rest}: TypographyProps) => {
  return (
    <Typography
      component="em"
      variant="inherit"
      sx={{fontStyle: 'italic', ...sx}}
      {...rest}
    >
      {children}
    </Typography>
  )
}

const Em = Emphasis
export {Em, Emphasis as default}
