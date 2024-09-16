import React from 'react'
import {Box} from '@mui/material'
import {BoxProps} from '@mui/material/Box'

/**
 * A reusable `Span` component built using MUI's `Box` component.
 * It renders its children inside a `span` HTML element while accepting all valid `BoxProps`.
 *
 * @param {BoxProps} props - The props are spread into the MUI `Box` component, with the `component` prop set to `"span"`.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `span` element.
 *
 * @returns {JSX.Element} A `Box` component that renders as a `span` element.
 *
 * @example
 * <Span sx={{ color: 'primary.main' }}>
 *   This is a span element styled with MUI's `Box`.
 * </Span>
 */
export default function Span({children, ...rest}: BoxProps) {
  return (
    <Box component="span" {...rest}>
      {children}
    </Box>
  )
}
