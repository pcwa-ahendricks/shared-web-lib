import {Typography as Type, type TypographyProps, styled} from '@mui/material'

const StyledStrong = styled(Type)({
  fontWeight: 600
})

/**
 * `Strong` is a React component that renders its children with a bold font weight
 * using Material-UI's `Typography` component. It sets the HTML element to `<strong>`
 * and applies a font weight of 600 by default.
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Strong` component.
 * @returns {JSX.Element} The rendered `strong` element with bold text.
 *
 * @example
 * <Strong>This text is strong and bold.</Strong>
 */
export default function Strong({children, ...rest}: TypographyProps) {
  return (
    <StyledStrong component="strong" variant="inherit" {...rest}>
      {children}
    </StyledStrong>
  )
}
