import React, {useMemo, useState, useEffect} from 'react'
import {
  Link,
  Typography as Type,
  makeStyles,
  createStyles
} from '@material-ui/core'
import MuiNextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import {parse} from 'url'
import clsx from 'clsx'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
  detectNext?: boolean
} & MuiNextLinkProps

const IS_NEXT_RE = /^http(s)?:\/\/(www\.)?pcwa\.net/i // http or https. www sub-domain optional. url lib requires protocol so regular expression should expect protocol too.
const IS_NEWS_RELEASE_RE = /^\/newsroom\/news-releases\/.+/i
const IS_NEWSLETTER_RE = /^\/newsroom\/publications\/newsletters\/.+/i

const useStyles = makeStyles(() =>
  createStyles({
    link: {
      cursor: 'pointer'
    }
  })
)

const FlexLink = ({
  children,
  href: hrefProp,
  as: asProp,
  scroll,
  isNextLink: isNextLinkProp = true,
  detectNext = false,
  className: classNameProp,
  ...rest
}: FlexLinkProps) => {
  const [href, setHref] = useState(hrefProp)
  const [as, setAs] = useState(asProp)
  const classes = useStyles()

  // Need to set as when asProp prop changes.
  useEffect(() => {
    setAs(asProp)
  }, [asProp])

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

  const hasHref = useMemo(() => href.length > 0, [href])

  const flexLinkEl = useMemo(
    () =>
      isNextLink ? (
        <MuiNextLink
          href={href}
          as={as}
          scroll={scroll}
          className={clsx([classes.link, classNameProp])}
          {...rest}
        >
          {children}
        </MuiNextLink>
      ) : hasHref ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx([classes.link, classNameProp])}
          {...rest}
        >
          {children}
        </Link>
      ) : (
        <Type color="primary" {...rest} className={classNameProp}>
          {children}
        </Type>
      ),
    [
      children,
      href,
      isNextLink,
      as,
      rest,
      scroll,
      hasHref,
      classes,
      classNameProp
    ]
  )

  return <>{flexLinkEl}</>
}

export default FlexLink
