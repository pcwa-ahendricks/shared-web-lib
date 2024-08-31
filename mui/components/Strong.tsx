import {Typography as Type, TypographyProps} from '@mui/material'

/**
 * `Strong` is a React component that renders its children with a bold font weight
 * using Material-UI's `Typography` component. It sets the HTML element to `<strong>`
 * and applies a font weight of 600 by default. Additional styling can be passed via the `sx` prop.
 *
 * @param {TypographyProps} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the `Strong` component.
 * @param {object} [props.sx] - Optional custom styles applied to the component.
 * @returns {JSX.Element} The rendered `strong` element with bold text.
 *
 * @example
 * <Strong>This text is strong and bold.</Strong>
 */
export default function Strong({children, sx, ...rest}: TypographyProps) {
  return (
    <Type
      component="strong"
      sx={{fontWeight: 600, ...sx}}
      variant="inherit"
      {...rest}
    >
      {children}
    </Type>
  )
}
