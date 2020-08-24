import React, {useContext, useMemo, useCallback, useEffect} from 'react'
import {
  Collapse,
  IconButton,
  lighten,
  darken,
  Theme,
  makeStyles,
  useTheme,
  createStyles,
  Typography as Type,
  useMediaQuery,
  SvgIcon
} from '@material-ui/core'
import {Alert, AlertProps, AlertTitle} from '@material-ui/lab'
import {
  UiContext,
  setAlertHidden,
  setAlertActive,
  addAlert
} from '@components/ui/UiStore'
import CloseIcon from '@material-ui/icons/Close'
import Parser, {domToReact, HTMLReactParserOptions} from 'html-react-parser'
import useSWR from 'swr'
import {textFetcher} from '@lib/fetcher'
import FlexLink from '@components/FlexLink/FlexLink'
// import {PaletteColor} from '@material-ui/core/styles/createPalette'
// import useMatchesIe from '@hooks/useMatchesIe'

export type CollapsibleAlertProps = {
  position: number
  hidden?: boolean
  active?: boolean
  collapsible?: boolean
  ieOnly?: boolean
  bottomBgGradient?: boolean
  topBgGradient?: boolean
} & AlertProps

type CollapsibleCosmicAlertProps = {
  muiIconName?: string
  muiIconFamily?: string
  headingHtmlStr?: string
  contentHtmlStr?: string
} & CollapsibleAlertProps

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alertRoot: ({
      bgColor,
      isFirstAlert,
      topBgGradient,
      isFirstAndLastAlert,
      bottomBgGradient,
      isLastAlert,
      isSMUp,
      isXS
    }: any) => ({
      // First Alert (SM)
      ...(isFirstAlert &&
        isSMUp &&
        topBgGradient &&
        (!isFirstAndLastAlert ||
          (isFirstAndLastAlert && !bottomBgGradient)) && {
          // Use a CSS color gradient the spans from the background color, to the standard warning color. Built with https://cssgradient.io. See https://github.com/mui-org/material-ui/blob/4e12b951f64fd47864b4dea8ec8631387a89ddb1/packages/material-ui-lab/src/Alert/Alert.js#L46 for more info.
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${bgColor} 8%)`
        }),
      // First and Last Alert (SM)
      ...(isSMUp &&
        isFirstAndLastAlert &&
        topBgGradient &&
        bottomBgGradient && {
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${bgColor} 8%, ${bgColor} 92%, ${theme.palette.background.default} 100%  )`
        }),
      // First and Last Alert (XS), or Last Alert
      ...((isXS && isFirstAndLastAlert && topBgGradient && bottomBgGradient) ||
        (isLastAlert &&
          bottomBgGradient &&
          (!isFirstAndLastAlert || (isFirstAndLastAlert && !topBgGradient)) && {
            background: `linear-gradient(0deg, ${theme.palette.background.default} 0%, ${bgColor} 8%)`
          }))
    })
  })
)

export default function CollapsibleAlert({
  position,
  hidden,
  active,
  ieOnly,
  children,
  collapsible = true,
  bottomBgGradient = true,
  topBgGradient = true,
  severity,
  ...rest
}: CollapsibleAlertProps) {
  const uiContext = useContext(UiContext)
  const {dispatch: uiDispatch, state: uiState} = uiContext
  const {alerts} = uiState
  const theme = useTheme()
  const paletteType = theme.palette.type === 'light' ? lighten : darken
  let palette: string
  switch (severity) {
    case 'success':
      palette = theme.palette.success.main
      break
    case 'warning':
      palette = theme.palette.warning.main
      break
    case 'error':
      palette = theme.palette.error.main
      break
    default:
      palette = theme.palette.info.main
      break
  }
  const bgColor = paletteType(palette, 0.9)
  const isSMUp = useMediaQuery(theme.breakpoints.up('sm'))
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))

  useEffect(() => {
    // Position may be zero.
    if (position || position === 0) {
      uiDispatch(addAlert({position, hidden, active, ieOnly}))
    }
  }, [uiDispatch, position, hidden, active, ieOnly])

  const activeShownAlerts = useMemo(
    () =>
      alerts
        .filter((alert) => alert.active && !alert.hidden)
        .sort((alert) => alert.position),
    [alerts]
  )
  const activeAlerts = useMemo(
    () =>
      alerts
        .filter((alert) => alert.active)
        .sort((a, b) => a.position - b.position),
    [alerts]
  )
  const showAlert = useMemo(
    () =>
      activeShownAlerts.findIndex((alert) => alert.position === position) >= 0,
    [activeShownAlerts, position]
  )

  const isFirstAlert = useMemo(
    () => activeAlerts.findIndex((alert) => alert.position === position) === 0,
    [activeAlerts, position]
  )
  const isLastAlert = useMemo(
    () =>
      activeAlerts.findIndex((alert) => alert.position === position) ===
      activeAlerts.length - 1,
    [activeAlerts, position]
  )

  const isFirstAndLastAlert = useMemo(() => {
    const idx = activeAlerts.findIndex((alert) => alert.position === position)
    return idx === activeAlerts.length - 1 && idx === 0
  }, [activeAlerts, position])

  const classes = useStyles({
    bgColor,
    isXS,
    // matchesIe,
    isFirstAlert,
    topBgGradient,
    isFirstAndLastAlert,
    bottomBgGradient,
    isLastAlert,
    isSMUp
  })
  const collapseHandler = useCallback(
    (hidden) => () => {
      uiDispatch(setAlertHidden({position, hidden}))
    },
    [uiDispatch, position]
  )

  const exitedHandler = useCallback(() => {
    uiDispatch(setAlertActive({position, active: false}))
  }, [uiDispatch, position])

  return (
    <Collapse in={showAlert} onExited={exitedHandler}>
      <Alert
        action={
          collapsible ? (
            <IconButton
              aria-label="close alert"
              color="inherit"
              size="small"
              onClick={collapseHandler(true)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          ) : null
        }
        severity={severity}
        classes={{root: classes.alertRoot}}
        {...rest}
      >
        {children}
      </Alert>
    </Collapse>
  )
}

const CollapsibleCosmicAlert = ({
  children,
  muiIconFamily = 'baseline',
  muiIconName,
  headingHtmlStr = '',
  contentHtmlStr = '',
  ...props
}: CollapsibleCosmicAlertProps) => {
  const {data: svgIconText = ''} = useSWR<string>(
    muiIconName
      ? `https://material-icons.github.io/material-icons/svg/${muiIconName}/${muiIconFamily}.svg`
      : null,
    textFetcher
  )

  const iconParserOptions: HTMLReactParserOptions = useMemo(
    () => ({
      replace: ({children, attribs, name}) => {
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
    }),
    []
  )
  const bodyParserOptions: HTMLReactParserOptions = useMemo(
    () => ({
      replace: ({children, attribs, name}) => {
        if (name === 'p') {
          return (
            <Type
              {...attribs}
              color="inherit"
              variant="inherit"
              paragraph={false}
            >
              {domToReact(children, bodyParserOptions)}
            </Type>
          )
        } else if (name === 'a') {
          return (
            <FlexLink
              {...attribs}
              underline="always"
              variant="inherit"
              detectNext
            >
              {/* Recursive parsing un-necessary with <a/> elements */}
              {/* {domToReact(children, parserOptions)} */}
              {domToReact(children)}
            </FlexLink>
          )
        }
      }
    }),
    []
  )

  const ParsedSvgIcon = useCallback(() => {
    const parsed = Parser(svgIconText, iconParserOptions)
    return <>{Array.isArray(parsed) ? parsed[0] : parsed}</>
  }, [svgIconText, iconParserOptions])

  const ParsedHeading = useCallback(() => {
    const parsed = Parser(headingHtmlStr, bodyParserOptions)
    return <>{Array.isArray(parsed) ? parsed[0] : parsed}</>
  }, [headingHtmlStr, bodyParserOptions])

  const ParsedContent = useCallback(() => {
    const parsed = Parser(contentHtmlStr, bodyParserOptions)
    return <>{Array.isArray(parsed) ? parsed[0] : parsed}</>
  }, [contentHtmlStr, bodyParserOptions])

  return (
    <CollapsibleAlert icon={<ParsedSvgIcon />} {...props}>
      <AlertTitle>
        <ParsedHeading />
      </AlertTitle>
      <ParsedContent />
      {children}
    </CollapsibleAlert>
  )
}

export {CollapsibleCosmicAlert}
