import {Box, BoxProps} from '@mui/material'
import useMatchesIe from '../hooks/useMatchesIe'

/**
 * IeOnly component conditionally renders its children based on whether the browser matches the criteria for Internet Explorer.
 * If the browser is Internet Explorer, the component will be displayed using the specified `display` value.
 * Otherwise, the component will be hidden.
 *
 * @param {BoxProps} props - The props that are passed down to the MUI Box component.
 * @param {string} [props.display='block'] - The CSS display value to use when the browser matches IE.
 * @param {React.ReactNode} props.children - The children elements to be rendered inside the Box component.
 * @returns {JSX.Element} - A MUI Box component that is only visible in Internet Explorer.
 */
export default function IeOnly({
  display: displayProp = 'block',
  children,
  ...props
}: BoxProps) {
  const matchesIe = useMatchesIe()
  return (
    <Box
      sx={{
        display: matchesIe ? displayProp : 'none'
      }}
      {...props}
    >
      {children}
    </Box>
  )
}
