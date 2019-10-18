import React from 'react'
import {ButtonBase, Typography as Type, Theme} from '@material-ui/core'
import {ButtonBaseProps} from '@material-ui/core/ButtonBase'
import {makeStyles, createStyles} from '@material-ui/core/styles'

// color prop is for Typography, not Button. size prop is not covered by ButtonBase, but by custom styling that uses similar naming for accepted values.
export type GlowButtonProps = {
  children: React.ReactNode
  size?: 'small' | 'medium' | 'large'
} & ButtonBaseProps<'a'>

type StyleProps = {
  size: GlowButtonProps['size']
}

const useStyles = makeStyles((theme: Theme) =>
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
          : 'inherit'
    }),
    type: ({size}: StyleProps) => ({
      // color: 'inherit',
      color: theme.palette.primary.main,
      '&:hover, &:active': {
        color: theme.palette.secondary.main
      },
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
          : 'inherit' // Why is the 'large' button font-size smaller than the medium size button in Material-UI?
    })
  })
)

const GlowButton = ({children, size = 'medium', ...rest}: GlowButtonProps) => {
  const classes = useStyles({size})

  return (
    <ButtonBase className={classes.root} {...rest}>
      <Type variant="button" color="inherit" classes={{root: classes.type}}>
        {children}
      </Type>
    </ButtonBase>
  )
}

export default GlowButton
