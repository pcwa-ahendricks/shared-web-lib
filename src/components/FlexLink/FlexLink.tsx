import React, {useMemo, useState, useEffect} from 'react'
import {Link, Typography as Type} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import MuiNextLink, {MuiNextLinkProps} from '@components/NextLink/NextLink'
import {parse} from 'url'
import clsx from 'clsx'

export type FlexLinkProps = {
  children: React.ReactNode
  isNextLink?: boolean
  detectNext?: boolean
} & Partial<MuiNextLinkProps>

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
  target,
  rel,
  variant = 'body1', // [TODO] - not sure why i need to force this default setting, but without it variant body2 is getting default'ed on Env/Planning page
  ...rest
}: FlexLinkProps) => {
  const [href, setHref] = useState(hrefProp)
  const [detectedNext, setDetectedNext] = useState<boolean>()
  const [as, setAs] = useState(asProp)
  const classes = useStyles()

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

  const flexLinkEl = useMemo(
    () =>
      isNextLink ? (
        <MuiNextLink
          href={muiNextLinkHref}
          as={as}
          scroll={scroll}
          rel={rel}
          target={target}
          variant={variant}
          {...rest}
          className={clsx([classes.link, classNameProp])}
        >
          {children}
        </MuiNextLink>
      ) : hasHref ? (
        <Link
          href={href}
          rel={rel ?? 'noopener noreferrer'}
          target={target ?? '_blank'}
          variant={variant}
          {...rest}
          className={clsx([classes.link, classNameProp])}
        >
          {children}
        </Link>
      ) : (
        <Type
          color="primary"
          variant={variant}
          {...rest}
          className={classNameProp}
        >
          {children}
        </Type>
      ),
    [
      children,
      href,
      variant,
      isNextLink,
      as,
      muiNextLinkHref,
      rest,
      scroll,
      hasHref,
      classes,
      rel,
      target,
      classNameProp
    ]
  )

  return <>{flexLinkEl}</>
}

export default FlexLink
