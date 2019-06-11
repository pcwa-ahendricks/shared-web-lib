import React from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import MuiLink, {LinkProps as MuiLinkProps} from '@material-ui/core/Link'
import {makeStyles} from '@material-ui/styles'

type NextComposedProps = {
  children: React.ReactNode
} & NextLinkProps &
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

// Using React.forwardRef made Typescript warnings and console error warnings go away. Not clear if this is implemented correctly.
const ForwardNextComposed = React.forwardRef(
  (props: NextComposedProps, ref: React.Ref<any>) => (
    <NextComposed {...props} {...ref} />
  )
)
ForwardNextComposed.displayName = 'NextComposed'

type NextMuiLinkProps = {
  activeClassName?: string
  as?: string
  href: string
  naked?: boolean
  onClick?: any
  prefetch?: boolean
  children: React.ReactNode
} & MuiLinkProps &
  NextComposedProps

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = ({
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

export default Link
