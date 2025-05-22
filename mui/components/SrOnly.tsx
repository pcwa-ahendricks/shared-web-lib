import React from 'react'
import {Box, type BoxProps} from '@mui/material'

/**
 * `SrOnly` is a React component that visually hides its children
 * while keeping them accessible to screen readers and search engines.
 * This is useful for providing additional context or labeling
 * that should not be visible on screen but should be announced
 * by assistive technologies.
 *
 * @param {BoxProps} props - The properties passed to the component.
 * @param {React.ReactNode} [props.children] - The content to be hidden from view but accessible in the DOM.
 *
 * @example
 * // Usage example:
 * <SrOnly>
 *   This text will not be visible but will be read by screen readers.
 * </SrOnly>
 *
 * @returns {JSX.Element} A `Box` component with screen-reader-only styling.
 */
const SrOnly = ({children, sx, ...rest}: BoxProps) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
        ...sx
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default SrOnly
