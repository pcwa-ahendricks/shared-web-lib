import React from 'react'
import clsx from 'clsx'
import {withRouter, RouterProps} from 'next/router'
import NextLink, {LinkProps} from 'next/link'
import MuiLink, {LinkProps as MuiLinkProps} from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/styles'

type NextComposedProps = {
  children: React.ReactNode
} & LinkProps &
  React.HTMLProps<HTMLAnchorElement>

const useStyles = makeStyles({
  root: {
    cursor: 'pointer'
  }
})

const NextComposed = ({
  as,
  href,
  prefetch,
  children,
  ...other
}: NextComposedProps) => {
  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a {...other}>{children}</a>
    </NextLink>
  )
}

type NextLinkProps = {
  activeClassName?: string
  as?: string
  className?: string
  href: string
  naked?: boolean
  onClick?: any
  prefetch?: boolean
  router: RouterProps
  children: React.ReactNode
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = ({
  activeClassName = 'active',
  router,
  className,
  naked,
  href,
  children,
  ...other
}: NextLinkProps & MuiLinkProps) => {
  const classes = useStyles()
  const classNames = clsx(className, classes.root, {
    [activeClassName]: router.pathname === href && activeClassName
  })

  if (naked) {
    return (
      <NextComposed className={className} href={href} {...other}>
        {children}
      </NextComposed>
    )
  }

  return (
    <MuiLink
      component={NextComposed}
      className={classNames}
      href={href}
      {...other}
    >
      {children}
    </MuiLink>
  )
}

export default withRouter(Link)
