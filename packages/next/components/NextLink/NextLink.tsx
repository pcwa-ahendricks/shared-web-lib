import React from 'react'
import clsx from 'clsx'
import {withRouter, RouterProps} from 'next/router'
import NextLink from 'next/link'
import MuiLink, {LinkProps as MuiLinkProps} from '@material-ui/core/Link'

type NextComposedProps = {
  href: string
  prefetch?: boolean
  as?: string
}

const NextComposed = ({
  as,
  href,
  prefetch,
  ...other
}: NextComposedProps & React.HTMLProps<HTMLAnchorElement>) => {
  return (
    <NextLink href={href} prefetch={prefetch} as={as}>
      <a {...other} />
    </NextLink>
  )
}

type LinkProps = {
  activeClassName?: string
  as?: string
  className?: string
  href: string
  naked?: boolean
  onClick?: any
  prefetch?: boolean
  router: RouterProps
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = ({
  activeClassName = 'active',
  router,
  className,
  naked,
  href,
  ...other
}: LinkProps & MuiLinkProps) => {
  const classNames = clsx(className, {
    [activeClassName]: router.pathname === href && activeClassName
  })

  if (naked) {
    return <NextComposed className={className} href={href} {...other} />
  }

  return <MuiLink component={NextComposed} className={classNames} {...other} />
}

export default withRouter(Link)
