import React from 'react'
import {Typography, type TypographyProps} from '@mui/material'

/**
 * `Code` is a React component that renders its children with a monospace font style
 * using Material-UI's `Typography` component. It uses the `sx` prop for styling,
 * making it compatible with React Server Components (RSC).
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Code` component.
 *
 * @example
 * // Usage Example:
 * <Code>const x = 42;</Code>
 *
 * @returns {React.ReactNode} The rendered code block with monospace styling.
 */
const Code = ({children, sx, ...rest}: TypographyProps) => {
  return (
    <Typography
      component="code"
      variant="inherit"
      sx={{
        fontFamily: 'monospace',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '4px',
        padding: '2px 4px',
        ...sx
      }}
      {...rest}
    >
      {children}
    </Typography>
  )
}

export default Code
