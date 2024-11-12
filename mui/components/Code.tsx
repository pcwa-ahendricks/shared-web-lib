import {Typography as Type, type TypographyProps, styled} from '@mui/material'
import {grey} from '@mui/material/colors'
import alpha from 'color-alpha'

const StyledCode = styled(Type)(({theme}) => ({
  backgroundColor: alpha(grey['200'], 0.95),
  fontFamily: 'monospace',
  padding: '1.5px 3px',
  borderRadius: theme.shape.borderRadius
}))

/**
 * A custom `Code` component that wraps MUI's `Typography` component, rendering text with code styling.
 *
 * @param {TypographyProps} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Code` component.
 * @returns {JSX.Element} The rendered `Code` component with the specified styling.
 *
 * @example
 * <Code>
 *   const x = 10;
 * </Code>
 */
export default function Code({children, ...rest}: TypographyProps) {
  return (
    <StyledCode component="code" variant="inherit" {...rest}>
      {children}
    </StyledCode>
  )
}
