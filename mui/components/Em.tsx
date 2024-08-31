import {Typography as Type, TypographyProps} from '@mui/material'

/**
 * `Em` is a React component that renders its children with an italic font style
 * using Material-UI's `Typography` component. It sets the HTML element to `<em>`
 * and applies an italic font style by default. Additional styling can be passed via the `sx` prop.
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Em` component.
 * @param {object} [props.sx] - Optional custom styles applied to the component.
 * @returns {JSX.Element} The rendered `em` element with italic text.
 *
 * @example
 * <Em>This text is emphasized and italicized.</Em>
 */
export default function Em({children, sx, ...rest}: TypographyProps) {
  return (
    <Type
      component="em"
      sx={{fontStyle: 'italic', ...sx}}
      variant="inherit"
      {...rest}
    >
      {children}
    </Type>
  )
}
