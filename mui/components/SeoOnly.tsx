import React from 'react'
import {Box, type BoxProps} from '@mui/material'

/**
 * `SeoOnly` is a React component that visually hides its children
 * while still keeping them accessible in the DOM. This is useful
 * for content that should be accessible to screen readers and search engines
 * but not visible to users.
 *
 * @param {BoxProps} props - The properties passed to the component.
 * @param {React.ReactNode} [props.children] - The content to be hidden from view but accessible in the DOM.
 *
 * @example
 * // Usage example:
 * <SeoOnly>
 *   <p>This text will not be visible but will still be in the DOM.</p>
 * </SeoOnly>
 *
 * @returns {JSX.Element} A `Box` component with its children hidden from view.
 */
const SeoOnly = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default SeoOnly
