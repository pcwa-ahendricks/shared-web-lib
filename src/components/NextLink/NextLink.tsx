import React, {forwardRef} from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import {Link as MuiLink, LinkProps as MuiLinkProps} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'

/*
  Adapted from https://github.com/mui-org/material-ui/blob/master/examples/nextjs-with-typescript/src/Link.tsx
*/

type NextComposedProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> &
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
const ForwardNextComposed = forwardRef(function forwardNextComposed(
  props: NextComposedProps,
  ref: React.Ref<any>
) {
  return <NextComposed {...props} {...ref} />
})

export type MuiNextLinkProps = {
  activeClassName?: string
  as?: string
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
}: MuiNextLinkProps) => {
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
      underline="hover"
      {...other}
    >
      {children}
    </MuiLink>
  )
}

export default MuiNextLink
