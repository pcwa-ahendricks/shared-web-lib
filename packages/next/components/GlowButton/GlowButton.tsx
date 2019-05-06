import React, {useState, useCallback, useMemo} from 'react'
import {ButtonBase, Typography as Type} from '@material-ui/core'
import {ButtonBaseProps} from '@material-ui/core/ButtonBase'
import {TypographyProps} from '@material-ui/core/Typography'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import clsx from 'clsx'

// color prop is for Typography, not Button. size prop is not covered by ButtonBase, but by custom styling that uses similar naming for accepted values.
export type GlowButtonProps = {
  children: React.ReactNode
  classes?: any // Optional flag appeases type-checking in <NextGlowButton/>.
  color?: TypographyProps['color']
  size?: 'small' | 'medium' | 'large'
} & ButtonBaseProps

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.light,
      boxSizing: 'border-box',
      minWidth: 64,
      borderRadius: 4,
      '&.hover': {
        '& $type': {
          color: theme.palette.secondary.main
        }
      },
      '&.smallButton': {
        padding: '4px 8px'
      },
      '&.mediumButton': {
        padding: '6px 8px'
      },
      '&.largeButton': {
        padding: '8px 24px'
      }
    },
    type: {
      whiteSpace: 'nowrap',
      '-webkit-transition': 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&.smallButton': {
        fontSize: '0.8125rem'
      },
      '&.mediumButton': {
        fontSize: '1rem'
      },
      '&.largeButton': {
        fontSize: '0.9375rem' // Why is this smaller than the medium size button in Material-UI?
      }
    }
  })

const GlowButton = ({
  classes,
  children,
  color = 'default',
  size = 'medium',
  ...rest
}: GlowButtonProps) => {
  const [active, setActive] = useState(false)

  const buttonEnterHandler = useCallback(() => {
    setActive(true)
  }, [])

  const buttonLeaveHandler = useCallback(() => {
    setActive(false)
  }, [])

  const buttonClass = useMemo(
    () =>
      clsx(classes.root, {
        hover: active,
        [`${size}Button`]: true
      }),
    [classes, size, active]
  )

  const typeRootClass = useMemo(
    () => clsx(classes.type, {[`${size}Button`]: true}),
    [classes, size]
  )

  return (
    <ButtonBase
      onMouseEnter={buttonEnterHandler}
      onMouseLeave={buttonLeaveHandler}
      className={buttonClass}
      {...rest}
    >
      <Type variant="button" color={color} classes={{root: typeRootClass}}>
        {children}
      </Type>
    </ButtonBase>
  )
}

export default withStyles(styles)(GlowButton)
