import React from 'react'
import {ButtonBase, Typography as Type} from '@material-ui/core'
import {ButtonBaseProps} from '@material-ui/core/ButtonBase'
import {makeStyles, createStyles} from '@material-ui/styles'
import GlowGreen, {GlowGreenProps} from '@components/GlowGreen/GlowGreen'

// color prop is for Typography, not Button. size prop is not covered by ButtonBase, but by custom styling that uses similar naming for accepted values.
export type GlowButtonProps = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
} & ButtonBaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> &
  GlowGreenProps

type StyleProps = {
  size: GlowButtonProps['size']
}

const useStyles = makeStyles(() =>
  createStyles({
    root: ({size}: StyleProps) => ({
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
          : 'unset'
    }),
    type: ({size}: StyleProps) => ({
      color: 'inherit',
      whiteSpace: 'nowrap',
      '-webkit-transition': 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      fontSize:
        size === 'small'
          ? '0.8125rem'
          : size === 'medium'
          ? '1rem'
          : size === 'large'
          ? '0.9375rem'
          : 'unset' // Why is the 'large' button font-size smaller than the medium size button in Material-UI?
    })
  })
)

const GlowButton = ({
  children,
  size = 'medium',
  inactiveColor,
  activeColor,
  ...rest
}: GlowButtonProps) => {
  const classes = useStyles({size})

  return (
    <GlowGreen inactiveColor={inactiveColor} activeColor={activeColor}>
      <ButtonBase className={classes.root} {...rest}>
        <Type variant="button" color="inherit" classes={{root: classes.type}}>
          {children}
        </Type>
      </ButtonBase>
    </GlowGreen>
  )
}

export default GlowButton
