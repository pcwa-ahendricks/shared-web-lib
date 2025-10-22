import {Box, type BoxProps} from '@mui/material'

/**
 * Main component wraps its children in an HTML <main> element using the MUI Box component.
 * This component is used to semantically group the primary content of the page.
 *
 * @param {BoxProps} props - The properties passed to the MUI Box component.
 * @param {React.ReactNode} [props.children] - The content to be wrapped in the main element.
 * @returns {JSX.Element} A Box component rendered as a <main> element, containing the children.
 */
const Main = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="main" {...rest}>
      {children}
    </Box>
  )
}

export default Main
