import React, {useMemo} from 'react'
import {Link} from '@material-ui/core'
import NextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
// import usePrefetchHandler from '@hooks/usePrefetchHandler'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
} & MuiNextLinkProps

const FlexLink = ({
  children,
  href,
  as,
  isNextLink = true,
  // prefetch = false,
  ...rest
}: FlexLinkProps) => {
  // const mouseEnterHandler = usePrefetchHandler()

  const flexLinkEl = useMemo(
    () =>
      isNextLink && href ? (
        <NextLink
          href={href}
          as={as}
          // onMouseEnter={prefetch ? () => {} : mouseEnterHandler(href)}
          {...rest}
        >
          {children}
        </NextLink>
      ) : (
        <Link href={href} target="_blank" rel="noopener noreferrer" {...rest}>
          {children}
        </Link>
      ),
    [children, href, isNextLink, as, rest]
  )

  return <>{flexLinkEl}</>
}

export default FlexLink
