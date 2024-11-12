import React from 'react'
import {Box, styled, type BoxProps} from '@mui/material'

const StyledSeoOnly = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  opacity: 0
})

/**
 * SeoOnly component hides its children visually while still rendering them in the DOM.
 * This is useful for content that should be accessible to search engines or screen readers
 * but not visible to users.
 *
 * @param {BoxProps} props - The properties passed to the component.
 * @param {React.ReactNode} [props.children] - The content to be hidden from view but accessible in the DOM.
 * @returns {JSX.Element} A Box component with content hidden from view but accessible in the DOM.
 */
const SeoOnly = ({children, ...rest}: BoxProps) => {
  return <StyledSeoOnly {...rest}>{children}</StyledSeoOnly>
}

export default SeoOnly
