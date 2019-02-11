// @flow
// $FlowFixMe
import React, {useState, type Node} from 'react'
import {ButtonBase, Typography as Type} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'
import classNames from 'classnames'
import Link from 'next/link'

type GlowButtonProps = {
  classes: any,
  children: Node,
  size: 'small' | 'medium' | 'large',
  color?: string
}

// No classes = No Union Type w/ GlowButtonProps
type NextGlowButtonProps = {
  children: Node,
  href: string,
  linkProps?: any,
  size?: 'small' | 'medium' | 'large',
  color?: string
}

const styles = (theme) => ({
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
  color,
  children,
  size,
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

GlowButton.defaultProps = {
  size: 'medium'
}

const NextGlowButton = ({
  href,
  linkProps,
  children,
  ...rest
}: NextGlowButtonProps) => {
  return (
    <Link href={href} passHref {...linkProps}>
      <StyledGlowButton {...rest}>{children}</StyledGlowButton>
    </Link>
  )
}

const StyledGlowButton = withStyles(styles)(GlowButton)
export default StyledGlowButton
export {NextGlowButton}
