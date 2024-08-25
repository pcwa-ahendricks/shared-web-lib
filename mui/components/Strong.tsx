import {Typography as Type, TypographyProps} from '@mui/material'

/**
 * A custom `Strong` component that wraps MUI's `Typography` component, rendering text with a strong emphasis (bold).
 *
 * The component uses the `strong` HTML tag and allows customization of the font weight. It defaults to a font weight of 500, but can be adjusted to 600 or 700.
 *
 * @param {TypographyProps & { weight?: '500' | '600' | '700' }} props - The props for the component.
 * @param {React.ReactNode} props.children - The content to be wrapped by the `Strong` component.
 * @param {'500' | '600' | '700'} [props.weight='500'] - The font weight to apply. Defaults to 500.
 * @param {object} [props.sx] - The style overrides for the component, extending MUI's `sx` prop.
 * @returns {JSX.Element} The rendered `Strong` component with the specified font weight.
 *
 * @example
 * <Strong weight="700">
 *   This text is bold and has a font weight of 700.
 * </Strong>
 */
export default function Strong({
  children,
  weight: fontWeight = '500',
  sx,
  ...rest
}: TypographyProps & {weight?: '500' | '600' | '700'}) {
  return (
    <Type
      component="strong"
      sx={{fontWeight, ...sx}}
      variant="inherit"
      {...rest}
    >
      {children}
    </Type>
  )
}
