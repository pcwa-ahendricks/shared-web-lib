import React from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import MuiLink, {LinkProps as MuiLinkProps} from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/styles'

/*
  Adapted from https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
*/

type NextComposedProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  NextLinkProps

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
  replace,
  scroll,
  shallow,
  passHref,
  ...other
}: NextComposedProps) => {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
    >
      <a {...other}>{children}</a>
    </NextLink>
  )
}

// Using React.forwardRef made Typescript warnings and console error warnings go away. Not clear if this is implemented correctly.
const ForwardNextComposed = React.forwardRef(
  (props: NextComposedProps, ref: React.Ref<any>) => (
    <NextComposed {...props} {...ref} />
  )
)
ForwardNextComposed.displayName = 'NextComposed'

export type NextMuiLinkProps = {
  activeClassName?: string
  as?: string
  href: string
  naked?: boolean
  onClick?: any
  prefetch?: boolean
  children: any // Not sure how to fix this using any other type than any, and the Omit helpers below. See <PrimaryHeader/> for type errors when another type is used here, such as ReactElement.
} & Omit<MuiLinkProps, 'children'> &
  Omit<NextComposedProps, 'children'>

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const MuiNextLink = ({
  activeClassName = 'active',
  className,
  naked,
  href,
  children,
  ...other
}: NextMuiLinkProps) => {
  const classes = useStyles()
  const router = useRouter()
  const classNames = clsx(className, classes.root, {
    [activeClassName]: router.pathname === href && activeClassName
  })

  if (naked) {
    return (
      <ForwardNextComposed className={className} href={href} {...other}>
        {children}
      </ForwardNextComposed>
    )
  }

  return (
    <MuiLink
      component={ForwardNextComposed}
      className={classNames}
      href={href}
      {...other}
    >
      {children}
    </MuiLink>
  )
}

export default MuiNextLink
