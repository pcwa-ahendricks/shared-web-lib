import React, {useState, useCallback} from 'react'
import {ButtonBase, Theme, Typography as Type} from '@material-ui/core'
import {ButtonBaseProps} from '@material-ui/core/ButtonBase'
import {TypographyProps} from '@material-ui/core/Typography'
import {makeStyles, createStyles} from '@material-ui/styles'

// color prop is for Typography, not Button. size prop is not covered by ButtonBase, but by custom styling that uses similar naming for accepted values.
export type GlowButtonProps = {
  children: React.ReactNode
  color?: TypographyProps['color']
  size?: 'small' | 'medium' | 'large'
} & ButtonBaseProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: ({size, active}: Partial<GlowButtonProps> & {active: boolean}) => ({
      color: theme.palette.primary.main,
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
          : 'unset',
      '& $type': {
        color: active ? theme.palette.secondary.main : 'unset'
      }
    }),
    type: ({size}: Partial<GlowButtonProps>) => ({
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
  color = 'initial',
  size = 'medium',
  ...rest
}: GlowButtonProps) => {
  const [active, setActive] = useState<boolean>(false)
  const classes = useStyles({size, active})

  const buttonEnterHandler = useCallback(() => {
    setActive(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setActive(false)
  }, [])

  return (
    <ButtonBase
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
      className={classes.root}
      {...rest}
    >
      <Type variant="button" color={color} classes={{root: classes.type}}>
        {children}
      </Type>
    </ButtonBase>
  )
}

export default GlowButton
