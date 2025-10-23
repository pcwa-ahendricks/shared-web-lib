import {Box, type BoxProps} from '@mui/material'

/**
 * Nav component wraps its children in an HTML <nav> element using the MUI Box component.
 * It provides a semantic grouping for navigational links or menus within the DOM.
 *
 * @param {BoxProps} props - The properties passed to the MUI Box component.
 * @param {React.ReactNode} [props.children] - The content to be wrapped in the nav element.
 * @returns {JSX.Element} A Box component rendered as a <nav> element, containing the children.
 */
const Nav = ({children, ...rest}: BoxProps) => {
  return (
    <Box component="nav" {...rest}>
      {children}
    </Box>
  )
}

export default Nav
