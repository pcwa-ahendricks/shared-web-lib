import React, {useState} from 'react'
import {ButtonBase, Typography as Type} from '@material-ui/core'
import {TypographyProps} from '@material-ui/core/Typography'
import {ButtonProps} from '@material-ui/core/Button'
import {withStyles, createStyles, Theme} from '@material-ui/core/styles'
import classNames from 'classnames'
import Link from 'next/link'

export type BaseGlowButtonProps = {
  children: React.ReactNode
  size?: ButtonProps['size']
  color?: TypographyProps['color']
}

// Prevents flow error when using intersecting types with <ENewsButton/> by extending non-exported type.
type GlowButtonProps = {
  classes: any
} & BaseGlowButtonProps

// No classes = No Union Type w/ GlowButtonProps
export type NextGlowButtonProps = {
  children: React.ReactNode
  href: string
  linkProps?: any
  size?: 'small' | 'medium' | 'large'
  color?: TypographyProps['color']
}

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
  color = 'textPrimary',
  size = 'medium',
  ...rest
}: GlowButtonProps) => {
  const [active, setActive] = useState(false)
  const buttonEnterHandler = () => {
    setActive(true)
  }
  const buttonLeaveHandler = () => {
    setActive(false)
  }

  const buttonClass = classNames(classes.root, {
    hover: active,
    [`${size}Button`]: true
  })
  const typeRootClass = classNames(classes.type, {[`${size}Button`]: true})
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

const NextGlowButton = ({
  href,
  linkProps,
  children,
  color = 'textPrimary',
  size = 'medium',
  ...rest
}: NextGlowButtonProps) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <StyledGlowButton {...rest} color={color} size={size}>
        {children}
      </StyledGlowButton>
    </Link>
  )
}

const StyledGlowButton = withStyles(styles)(GlowButton)
export default StyledGlowButton
export {NextGlowButton}
