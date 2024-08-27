import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

/**
 * SeoOnly component hides its children visually while still rendering them in the DOM.
 * This is useful for content that should be accessible to search engines or screen readers
 * but not visible to users.
 *
 * @param {Props} props - The properties passed to the component.
 * @param {React.ReactNode} [props.children] - The content to be hidden from view but accessible in the DOM.
 * @param {BoxProps} [props.rest] - Additional props passed down to the MUI Box component.
 * @returns {JSX.Element} A Box component with content hidden from view but accessible in the DOM.
 */
const SeoOnly = ({children, sx = {}, ...rest}: BoxProps) => {
  return (
    <Box
      sx={{
        ...sx,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

export default SeoOnly
