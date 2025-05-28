/**
 * A custom Link component for use with MUI and Next.js.
 * It wraps the Next.js Link with MUI's Link styling and adds logic for
 * distinguishing between internal and external links.
 * See https://github.com/mui/material-ui/blob/v7.1.0/examples/material-ui-nextjs-pages-router-ts/src/Link.tsx
 * and https://mui.com/material-ui/guides/routing/#next-js for more info.
 */
import * as React from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {type LinkProps as NextLinkProps} from 'next/link'
import MuiLink, {type LinkProps as MuiLinkProps} from '@mui/material/Link'

/**
 * Props for NextLinkComposed, a wrapper around Next.js Link
 * that forwards refs and supports anchor tag props.
 */
export interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<
      NextLinkProps,
      'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'
    > {
  to: NextLinkProps['href']
  linkAs?: NextLinkProps['as']
}

/**
 * A ref-forwarding component that renders a Next.js `Link` using an `<a>` element.
 *
 * @param props - Props to control navigation and anchor behavior.
 * @param props.to - The destination URL or path.
 * @param props.linkAs - Optional alias for dynamic routes.
 * @param props.target - Optional target attribute for the anchor.
 * @param props.rel - Optional rel attribute for the anchor.
 * @returns A standard anchor element wrapped in Next.js `Link`.
 */
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

/**
 * Props for the custom Link component combining Next.js and MUI link behavior.
 * Supports styling, active class detection, and external link fallback.
 */
export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as'] // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean
  target?: string
  rel?: string
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

/**
 * A custom Link component that integrates MUI and Next.js behavior.
 *
 * @component
 * @param props - The props for the Link component.
 * @param props.href - The destination URL or path.
 * @param props.noLinkStyle - If true, omits MUI's styling and returns a plain Next.js link.
 * @param props.activeClassName - CSS class to apply when the link matches the current route.
 * @param props.target - Specifies where to open the linked document.
 * @param props.rel - Specifies the relationship between the current document and the linked document.
 * @returns A styled MUI link or a plain anchor based on whether the link is internal or external.
 */
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = 'active',
      as,
      className: classNameProps,
      href,
      linkAs: linkAsProp,
      noLinkStyle,
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
