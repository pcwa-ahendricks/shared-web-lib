import React, {useMemo} from 'react'
import {Link} from '@material-ui/core'
import NextLink, {NextMuiLinkProps} from '@components/NextLink/NextLink'
import usePrefetchHandler from '@hooks/usePrefetchHandler'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
} & NextMuiLinkProps

const FlexLink = ({
  children,
  href,
  isNextLink = true,
  prefetch = true,
  ...rest
}: FlexLinkProps) => {
  const mouseEnterHandler = usePrefetchHandler()

  const flexLinkEl = useMemo(
    () =>
      isNextLink ? (
        <NextLink
          href={href}
          onMouseEnter={prefetch ? () => {} : mouseEnterHandler(href)}
          {...rest}
        >
          {children}
        </NextLink>
      ) : (
        <Link href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Link>
      ),
    [children, href, isNextLink, mouseEnterHandler, prefetch, rest]
  )

  return <React.Fragment>{flexLinkEl}</React.Fragment>
}

export default FlexLink
