// cspell:ignore focusable
import React, {useContext, useMemo, useCallback, useEffect} from 'react'
import {
  Collapse,
  IconButton,
  lighten,
  darken,
  Theme,
  useTheme,
  useMediaQuery,
  Alert,
  AlertProps
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import {
  UiContext,
  setAlertHidden,
  setAlertActive,
  addAlert
} from '@components/ui/UiStore'
import CloseIcon from '@mui/icons-material/Close'

export type CollapsibleAlertProps = {
  position: number
  hidden?: boolean
  active?: boolean
  collapsible?: boolean
  ieOnly?: boolean
  bottomBgGradient?: boolean
  topBgGradient?: boolean
} & AlertProps

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
  const paletteType = theme.palette.mode === 'light' ? lighten : darken
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
