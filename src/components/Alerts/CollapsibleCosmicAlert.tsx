// cspell:ignore focusable
import React, {useCallback, useEffect, useState} from 'react'
import {AlertTitle, SvgIcon} from '@mui/material'
import Parser, {domToReact, HTMLReactParserOptions} from 'html-react-parser'
import useSWR from 'swr'
import {textFetcher} from '@lib/fetcher'
import BodyParagraph from './BodyParagraph'
import CollapsibleAlert, {CollapsibleAlertProps} from './CollapsibleAlert'
import Heading from './Heading'
import {useRouter} from 'next/router'
import Link from '@components/Link'

type CollapsibleCosmicAlertProps = {
  muiIconName?: string
  muiIconFamily?: string
  showOnRoute?: string
  headingHtmlStr?: string
  contentHtmlStr?: string
} & CollapsibleAlertProps

const iconParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    // duck typing, see https://github.com/remarkablemark/html-react-parser/issues/221#issuecomment-985879867 for more info
    if ('name' in domNode && 'attribs' in domNode) {
      const {children = [], attribs, name} = domNode
      if (name === 'svg') {
        return (
          <SvgIcon {...attribs}>
            {/* Recursive parsing un-necessary with <svg/> elements */}
            {/* {domToReact(children, parserOptions)} */}
            {domToReact(children)}
          </SvgIcon>
        )
      }
    }
  }
}

const headingParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if ('name' in domNode && 'attribs' in domNode) {
      const {attribs, name, children} = domNode
      if (name === 'p') {
        return (
          <Heading attribs={attribs}>
            {domToReact(children, headingParserOptions)}
          </Heading>
        )
      } else if (name === 'a') {
        const {href = '', ...restAttribs} = attribs
        return (
          <Link
            href={href} // suppress typescript warning
            {...restAttribs}
            underline="always"
            color="inherit"
            variant="inherit"
          >
            {/* Recursive parsing un-necessary with <a/> elements */}
            {/* {domToReact(children, parserOptions)} */}
            {domToReact(children)}
          </Link>
        )
      }
    }
  }
}
const bodyParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if ('name' in domNode && 'attribs' in domNode) {
      const {attribs, name, children} = domNode
      if (name === 'p') {
        return (
          <BodyParagraph attribs={attribs}>
            {domToReact(children, bodyParserOptions)}
          </BodyParagraph>
        )
      } else if (name === 'a') {
        const {href = '', ...restAttribs} = attribs
        return (
          <Link
            href={href} // suppress typescript warning
            {...restAttribs}
            underline="always"
            variant="inherit"
          >
            {/* Recursive parsing un-necessary with <a/> elements */}
            {/* {domToReact(children, parserOptions)} */}
            {domToReact(children)}
          </Link>
        )
      }
    }
  }
}

function CollapsibleCosmicAlert({
  children,
  muiIconFamily = 'baseline',
  muiIconName,
  showOnRoute = '/',
  headingHtmlStr = '',
  contentHtmlStr = '',
  ...props
}: CollapsibleCosmicAlertProps) {
  const {data: svgIconText = ''} = useSWR<string>(
    muiIconName
      ? `https://material-icons.github.io/material-icons/svg/${muiIconName}/${muiIconFamily}.svg`
      : null,
    textFetcher
  )

  const ParsedSvgIcon = useCallback(() => {
    const parsed = Parser(svgIconText, iconParserOptions)
    return <>{Array.isArray(parsed) ? parsed.map((e) => e) : parsed}</>
  }, [svgIconText])

  const ParsedHeading = useCallback(() => {
    const parsed = Parser(headingHtmlStr, headingParserOptions)
    return <>{Array.isArray(parsed) ? parsed.map((e) => e) : parsed}</>
  }, [headingHtmlStr])

  const ParsedContent = useCallback(() => {
    const parsed = Parser(contentHtmlStr, bodyParserOptions)
    return <>{Array.isArray(parsed) ? parsed.map((e) => e) : parsed}</>
  }, [contentHtmlStr])

  const SvgIconEx = useCallback(
    () => (svgIconText ? <ParsedSvgIcon /> : <EmptyIcon />),
    [svgIconText, ParsedSvgIcon]
  )
  const router = useRouter()
  const {asPath} = router
  const [showAlert, setShowAlert] = useState(false)

  // new RegExp doesn't work with useMemo, hence useEffect
  useEffect(() => {
    const regex = new RegExp(showOnRoute || '/', 'gi')
    const m = regex.test(asPath)
    setShowAlert(m)
  }, [showOnRoute, asPath])

  if (!showAlert) {
    return <></>
  }

  return (
    <CollapsibleAlert icon={<SvgIconEx />} {...props}>
      <AlertTitle>
        <ParsedHeading />
      </AlertTitle>
      <ParsedContent />
      {children}
    </CollapsibleAlert>
  )
}

function EmptyIcon() {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      viewBox="0 0 24 24"
      aria-hidden={true}
      width={24}
      height={24}
    />
  )
}

export {CollapsibleCosmicAlert}
