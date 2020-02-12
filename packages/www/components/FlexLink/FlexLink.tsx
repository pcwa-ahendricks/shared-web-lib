import React, {useMemo, useState, useEffect} from 'react'
import {Link} from '@material-ui/core'
import NextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import {parse} from 'url'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
  detectNext?: boolean
} & MuiNextLinkProps

const IS_NEXT_RE = /^(http(s)?:\/\/)?(www\.)?pcwa\.net/i // http or https. protocol optional. www sub-domain optional.
const IS_NEWS_RELEASE_RE = /^\/newsroom\/news-releases\/.+/i
const IS_NEWSLETTER_RE = /^\/newsroom\/publications\/newsletters\/.+/i

const FlexLink = ({
  children,
  href: hrefProp,
  as: asProp,
  isNextLink: isNextLinkProp = true,
  detectNext = false,
  ...rest
}: FlexLinkProps) => {
  const [href, setHref] = useState(hrefProp)
  const [as, setAs] = useState(asProp)

  // Note - Detection using Regular Expression will override isNextLink prop value.
  const isNextLink = useMemo(
    () => (!detectNext ? isNextLinkProp : IS_NEXT_RE.test(hrefProp)),
    [isNextLinkProp, detectNext, hrefProp]
  )

  // Strip www.pcwa.net out of Next links and set "as" prop accordingly.
  useEffect(() => {
    if (detectNext && IS_NEXT_RE.test(hrefProp)) {
      const {path} = parse(hrefProp)
      if (IS_NEWS_RELEASE_RE.test(path ?? '')) {
        setAs(path ?? '')
        setHref('/newsroom/news-releases/[release-date]')
      } else if (IS_NEWSLETTER_RE.test(path ?? '')) {
        setAs(path ?? '')
        setHref('/newsroom/publications/newsletters/[publish-date]')
      } else {
        setHref(path ?? '')
      }
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
