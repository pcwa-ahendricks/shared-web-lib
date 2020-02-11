import React, {useMemo, useState, useEffect} from 'react'
import {Link} from '@material-ui/core'
import NextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import {parse} from 'url'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
  detectNext?: boolean
} & MuiNextLinkProps

const IS_NEXT_RE = /https:\/\/www\.pcwa\.net/gi

const FlexLink = ({
  children,
  href: hrefProp,
  as,
  isNextLink: isNextLinkProp = true,
  detectNext = false,
  ...rest
}: FlexLinkProps) => {
  const [href, setHref] = useState(hrefProp)

  // Note - Detection using Regular Expression will override isNextLink prop value.
  const isNextLink = useMemo(
    () => (!detectNext ? isNextLinkProp : IS_NEXT_RE.test(hrefProp)),
    [isNextLinkProp, detectNext, hrefProp]
  )

  // Strip www.pcwa.net out of Next links.
  useEffect(() => {
    if (detectNext && IS_NEXT_RE.test(hrefProp)) {
      const parsed = parse(hrefProp)
      setHref(parsed.path ?? '')
    } else {
      setHref(hrefProp)
    }
  }, [hrefProp, detectNext])

  const flexLinkEl = useMemo(
    () =>
      isNextLink ? (
        <NextLink href={href} as={as} {...rest}>
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
