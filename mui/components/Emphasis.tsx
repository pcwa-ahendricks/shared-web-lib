import {Typography as Type, type TypographyProps, styled} from '@mui/material'

const StyledEm = styled(Type)({
  fontStyle: 'italic'
})

/**
 * `Em` is a React component that renders its children with an italic font style
 * using Material-UI's `Typography` component. It sets the HTML element to `<em>`
 * and applies an italic font style by default.
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Em` component.
 * @returns {JSX.Element} The rendered `em` element with italic text.
 *
 * @example
 * <Em>This text is emphasized and italicized.</Em>
 */
const Emphasis: React.FC<TypographyProps> = ({children, ...rest}) => {
  return (
    <StyledEm component="em" variant="inherit" {...rest}>
      {children}
    </StyledEm>
  )
}

// Export an alias `Em` for convenience
const Em = Emphasis

export {Emphasis as default, Em}
