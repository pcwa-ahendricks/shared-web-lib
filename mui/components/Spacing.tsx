import {useMemo} from 'react'
import {Box, BoxProps, useMediaQuery, useTheme} from '@mui/material'

type Props = {
  size?: 'medium' | 'x-small' | 'small' | 'large' | 'x-large'
  factor?: number
} & BoxProps

/**
 * A `Spacing` component that adjusts vertical spacing (`margin-y`) based on the provided size and factor.
 *
 * This component leverages Material-UI's `Box` component and adds customizable spacing that is responsive to screen size.
 * On smaller screens, the vertical spacing is reduced slightly.
 *
 * @param {Props} props - The props for the `Spacing` component.
 * @param {'medium' | 'x-small' | 'small' | 'large' | 'x-large'} [props.size='medium'] - The base size of the spacing. Defaults to 'medium'.
 * @param {number} [props.factor=1] - A multiplier for adjusting the spacing size. Defaults to 1.
 * @param {React.ReactNode} props.children - The content to be wrapped by the `Spacing` component.
 * @returns {JSX.Element} The rendered `Spacing` component with the appropriate vertical spacing.
 *
 * @example
 * <Spacing size="large" factor={2}>
 *   <YourComponent />
 * </Spacing>
 */
export default function Spacing({
  children,
  factor = 1,
  size = 'medium',
  ...rest
}: Props) {
  const spacing = useMemo(() => {
    switch (size) {
      case 'x-small':
        return 1 * factor
      case 'small':
        return 2 * factor
      case 'medium':
        return 3 * factor
      case 'large':
        return 4 * factor
      case 'x-large':
        return 5 * factor
      default:
        return 3 * factor
    }
  }, [size, factor])

  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  // shrink vertical spacing on mobile devices
  const responsiveSpacing = isXS ? spacing * 0.75 : spacing

  return (
    <Box my={responsiveSpacing} {...rest}>
      {children}
    </Box>
  )
}
