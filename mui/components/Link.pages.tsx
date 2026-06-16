/**
 * Pages Router variant of the MUI+Next.js Link component.
 * Uses `useRouter` from `next/router` instead of `usePathname` from `next/navigation`.
 * For App Router projects, use Link.tsx instead.
 */
import * as React from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {type LinkProps as NextLinkProps} from 'next/link'
import MuiLink, {type LinkProps as MuiLinkProps} from '@mui/material/Link'

export interface NextLinkComposedProps
  extends
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<
      NextLinkProps,
      'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'
    > {
  to: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
}

export const NextLinkComposed = React.forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {to, linkAs, target, rel, ...other} = props

  return (
    <NextLink
      href={to}
      as={linkAs}
      ref={ref}
      target={target}
      rel={rel}
      {...other}
    />
  )
})

export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
  noLinkStyle?: boolean
  target?: string
  rel?: string
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = 'active',
      as,
      className: classNameProps,
      href,
      linkAs: linkAsProp,
      noLinkStyle,
      scroll,
      target,
      rel,
      ...other
    } = props

    const {pathname: routerPathname} = useRouter()
    const pathname = typeof href === 'string' ? href : href?.pathname

    const className = clsx(classNameProps, {
      [activeClassName]: routerPathname === pathname && activeClassName
    })

    const linkAs = linkAsProp || as || (href as string)
    const nextjsProps = {
      to: href,
      linkAs,
      scroll,
      target,
      rel
    }

    const isExternal =
      typeof href === 'string' &&
      (href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:'))

    if (isExternal) {
      return (
        <MuiLink
          className={className}
          href={href}
          ref={ref}
          target={target || '_blank'}
          rel={rel || 'noopener noreferrer'}
          {...other}
        />
      )
    }

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref}
          {...nextjsProps}
          {...other}
        />
      )
    }

    return (
      <MuiLink
        component={NextLinkComposed}
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    )
  }
)

export default Link
