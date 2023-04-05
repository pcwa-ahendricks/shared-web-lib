import React, {useMemo, useState, useEffect} from 'react'
import {Link, LinkProps, Typography as Type} from '@mui/material'
import {parse} from 'url'
import NextLink, {LinkProps as NextLinkProps} from 'next/link'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
  detectNext?: boolean
} & Partial<LinkProps> &
  NextLinkProps

const IS_NEXT_RE = /^http(s)?:\/\/(www\.)?pcwa\.net/i // http or https. www sub-domain optional. url lib requires protocol so regular expression should expect protocol too.
const IS_NEWS_RELEASE_RE = /^\/newsroom\/news-releases\/.+/i
const IS_NEWSLETTER_RE = /^\/newsroom\/publications\/newsletters\/.+/i

const FlexLink = ({
  children,
  href: hrefProp,
  as: asProp,
  scroll,
  isNextLink: isNextLinkProp = true,
  detectNext = false,
  target,
  rel,
  variant = 'body1' as LinkProps['variant'], // [TODO] - not sure why i need to force this default setting, but without it variant body2 is getting default'ed on Env/Planning page
  sx,
  ...rest
}: FlexLinkProps) => {
  const [href, setHref] = useState(hrefProp)
  const [detectedNext, setDetectedNext] = useState<boolean>()
  const [as, setAs] = useState(asProp)

  // Need to set as when asProp prop changes.
  useEffect(() => {
    setAs(asProp)
  }, [asProp])

  // Note - Detection using Regular Expression will override isNextLink prop value.
  const isNextLink = useMemo(
    () =>
      !detectNext ? isNextLinkProp : hrefProp && IS_NEXT_RE.test(hrefProp),
    [isNextLinkProp, detectNext, hrefProp]
  )

  // Strip www.pcwa.net out of Next links and set "as" prop accordingly.
  useEffect(() => {
    if (detectNext && hrefProp && IS_NEXT_RE.test(hrefProp)) {
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
      setDetectedNext(true)
    } else {
      setHref(hrefProp)
      setDetectedNext(true)
    }
  }, [hrefProp, detectNext])

  const hasHref = useMemo(() => href && href.length > 0, [href])

  // wait for detection to complete (if "detectNext" is true) to pass href to Next Link
  const muiNextLinkHref = !href || (detectNext && !detectedNext) ? '#' : href
  if (isNextLink) {
    return (
      <Link
        component={NextLink}
        href={muiNextLinkHref}
        scroll={scroll}
        // IMPORTANT - WHOLE PAGE MAY BE ALL WHITE/BLANK PAGE IF THERE IS AN ERROR WITH MUI AND AN A ROUTE THAT GETS CALL WITH 'as'. To debug error simply console.log 'as' prop to see which routes are getting loaded.
        as={as}
        target={target}
        variant={variant}
        sx={{
          cursor: 'pointer',
          ...sx
        }}
        {...rest}
      >
        {children}
      </Link>
    )
  }
  if (hasHref) {
    return (
      <Link
        href={href}
        rel={rel ?? 'noopener noreferrer'}
        target={target ?? '_blank'}
        variant={variant}
        sx={{
          cursor: 'pointer',
          ...sx
        }}
        underline="hover"
        {...rest}
      >
        {children}
      </Link>
    )
  }
  return <Type variant={variant}>{children}</Type>
}

export default FlexLink
