import React from 'react'
import {Box, type BoxProps} from '@mui/material'

/**
 * Section component wraps its children in an HTML <section> element using the MUI Box component.
 * It allows for easy styling and layout while semantically grouping content in the DOM.
 *
 * @param {BoxProps} props - The properties passed to the MUI Box component.
 * @param {React.ReactNode} [props.children] - The content to be wrapped in the section.
 * @returns {JSX.Element} A Box component rendered as a <section> element, containing the children.
 */
const Section = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="section" {...rest}>
      {children}
    </Box>
  )
}

export default Section
