import React from 'react'
import {
  ButtonBase,
  Typography as Type,
  ButtonBaseProps,
  useTheme
} from '@mui/material'
import {Theme} from '@lib/material-theme'
import useLinkComponent from '@hooks/useLinkComponent'

// color prop is for Typography, not Button. size prop is not covered by ButtonBase, but by custom styling that uses similar naming for accepted values.
export type GlowButtonProps = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
} & ButtonBaseProps<'a'>

const GlowButton = ({
  children,
  size = 'medium',
  href,
  ...props
}: GlowButtonProps) => {
  const theme = useTheme<Theme>()
  const {sx, ...rest} = props
  const LinkComponent = useLinkComponent()
  return (
    <ButtonBase
      LinkComponent={LinkComponent}
      href={href}
      sx={{
        // color: theme.palette.primary.main,
        color: 'inherit',
        boxSizing: 'border-box',
        minWidth: 64,
        borderRadius: 4,
        padding:
          size === 'small'
            ? '4px 8px'
            : size === 'medium'
              ? '6px 8px'
              : size === 'large'
                ? '8px 24px'
                : 'inherit'
      }}
      {...rest}
    >
      <Type
        variant="button"
        color="inherit"
        sx={{
          // color: 'inherit',
          color: theme.palette.primary.main,
          '&:hover, &:active': {
            color: theme.palette.secondary.main
          },
          whiteSpace: 'nowrap',
          transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          fontSize:
            size === 'small'
              ? '0.8125rem'
              : size === 'medium'
                ? '1rem'
                : size === 'large'
                  ? '0.9375rem'
                  : 'inherit', // Why is the 'large' button font-size smaller than the medium size button in Material-UI?

          ...sx
        }}
      >
        {children}
      </Type>
    </ButtonBase>
  )
}

export default GlowButton
