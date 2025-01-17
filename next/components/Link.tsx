// See https://github.com/mui/material-ui/tree/master/examples/material-next-ts and https://mui.com/material-ui/guides/routing/#next-js for more info
import React, {forwardRef} from 'react'
import clsx from 'clsx'
import {useRouter} from 'next/router'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'
import MuiLink, {LinkProps as MuiLinkProps} from '@mui/material/Link'
import {styled} from '@mui/material/styles'

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({})

/**
 * Props for the NextLinkComposed component, combining props from both Next.js Link and HTML anchor elements.
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
 * A custom component that combines Next.js Link and MUI's styled anchor for consistent behavior and styling.
 *
 * @param {NextLinkComposedProps} props - The props for the component.
 * @param {React.Ref<HTMLAnchorElement>} ref - The ref to be forwarded to the anchor element.
 * @returns {JSX.Element} The rendered NextLinkComposed component.
 */
export const NextLinkComposed = forwardRef<
  HTMLAnchorElement,
  NextLinkComposedProps
>(function NextLinkComposed(props, ref) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior = true,
    locale,
    ...other
  } = props

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
      legacyBehavior={legacyBehavior}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  )
})

/**
 * Props for the Link component, combining Next.js Link props, MUI Link props, and additional custom props.
 */
export type LinkProps = {
  activeClassName?: string
  as?: NextLinkProps['as']
  href: NextLinkProps['href']
  linkAs?: NextLinkProps['as'] // Useful when the as prop is shallow by styled().
  noLinkStyle?: boolean
  // added (AZH)
  externalProps?: React.AnchorHTMLAttributes<HTMLAnchorElement>
  nonExternalProps?: Partial<NextLinkProps>
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
  Omit<MuiLinkProps, 'href'>

/**
 * A styled version of the Next.js Link component that integrates with MUI and handles both internal and external links. See
 * https://nextjs.org/docs/api-reference/next/link for more info.
 *
 * @param {LinkProps} props - The props for the Link component.
 * @param {React.Ref<HTMLAnchorElement>} ref - The ref to be forwarded to the anchor element.
 * @returns {JSX.Element} The rendered Link component.
 */
const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const {
      activeClassName = 'active',
      as,
      className: classNameProps,
      href,
      legacyBehavior,
      linkAs: linkAsProp,
      locale,
      noLinkStyle,
      prefetch,
      replace,
      role, // Link don't have roles.
      scroll,
      shallow,
      externalProps = {target: '_blank', rel: 'noopener noreferrer'},
      nonExternalProps,
      ...other
    } = props

    const {pathname} = useRouter()
    const hrefPath = typeof href === 'string' ? href : href.pathname
    const className = clsx(classNameProps, {
      [activeClassName]: pathname === hrefPath && activeClassName
    })

    const isExternal =
      typeof href === 'string' &&
      (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0)

    if (isExternal) {
      if (noLinkStyle) {
        return (
          <Anchor
            className={className}
            href={href}
            ref={ref}
            {...externalProps}
            {...other}
          />
        )
      }

      return (
        <MuiLink
          className={className}
          href={href}
          ref={ref}
          {...externalProps}
          {...other}
        />
      )
    }

    const linkAs = linkAsProp || as
    const nextjsProps = {
      to: href,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch,
      legacyBehavior,
      locale
    }

    if (noLinkStyle) {
      return (
        <NextLinkComposed
          className={className}
          ref={ref}
          {...nonExternalProps}
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
        {...nonExternalProps}
        {...nextjsProps}
        {...other}
      />
    )
  }
)

export default Link
