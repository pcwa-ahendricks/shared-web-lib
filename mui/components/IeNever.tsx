import {Box, BoxProps} from '@mui/material'
import useMatchesIe from '../hooks/useMatchesIe'

/**
 * IeNever component hides its children when the browser matches the criteria for Internet Explorer.
 *
 * @param {BoxProps} props - The props that are passed down to the MUI Box component.
 * @returns {JSX.Element | null} - Returns null if the browser is Internet Explorer, otherwise returns the Box component with children.
 */
export default function IeNever({children, ...props}: BoxProps) {
  const matches = useMatchesIe()
  return matches ? null : <Box {...props}>{children}</Box>
}
