import React, {useContext, useMemo, useCallback, useEffect} from 'react'
import clsx from 'clsx'
import {
  Collapse,
  IconButton,
  lighten,
  darken,
  Theme,
  makeStyles,
  useTheme,
  createStyles
} from '@material-ui/core'
import {Alert, AlertProps} from '@material-ui/lab'
import {
  UiContext,
  setAlertHidden,
  setAlertActive,
  addAlert
} from '@components/ui/UiStore'
import CloseIcon from '@material-ui/icons/Close'
import useMatchesIe from '@hooks/useMatchesIe'

export type CollapsibleAlertProps = {
  position: number
  hidden?: boolean
  active?: boolean
  ieOnly?: boolean
  bottomBgGradient?: boolean
  topBgGradient?: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // alert: {},
    firstAlert: ({bgColor}: any) => ({
      [`${theme.breakpoints.up('sm')}`]: {
        // Use a CSS color gradient the spans from the background color, to the standard warning color. Built with https://cssgradient.io. See https://github.com/mui-org/material-ui/blob/4e12b951f64fd47864b4dea8ec8631387a89ddb1/packages/material-ui-lab/src/Alert/Alert.js#L46 for more info.
        background: `linear-gradient(180deg, ${
          theme.palette.background.default
        } 0%, ${bgColor(theme.palette.warning.main, 0.9)} 8%)`
      }
    }),
    lastAlert: ({bgColor}: any) => ({
      [`${theme.breakpoints.up('sm')}`]: {
        background: `linear-gradient(0deg, ${
          theme.palette.background.default
        } 0%, ${bgColor(theme.palette.warning.main, 0.9)} 8%)`
      }
    }),
    firstAndLastAlert: ({bgColor}: any) => ({
      [`${theme.breakpoints.up('sm')}`]: {
        background: `linear-gradient(180deg, ${
          theme.palette.background.default
        } 0%, ${bgColor(theme.palette.warning.main, 0.9)} 8%, ${bgColor(
          theme.palette.warning.main,
          0.9
        )} 92%, ${theme.palette.background.default} 100%  )`
      }
    })
  })
)

export default function CollapsibleAlert({
  position,
  hidden,
  active,
  ieOnly,
  children,
  bottomBgGradient = true,
  topBgGradient = true,
  ...rest
}: CollapsibleAlertProps & AlertProps) {
  const uiContext = useContext(UiContext)
  const {dispatch: uiDispatch, state: uiState} = uiContext
  const {alerts} = uiState
  const theme = useTheme()
  const matchesIe = useMatchesIe()
  const bgColor = theme.palette.type === 'light' ? lighten : darken
  const classes = useStyles({bgColor, matchesIe})

  useEffect(() => {
    // Position will never be zero.
    if (position) {
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
  const isLastAlert = useMemo(() => {
    return (
      activeAlerts.findIndex((alert) => alert.position === position) ===
      activeAlerts.length - 1
    )
  }, [activeAlerts, position])

  const isFirstAndLastAlert = useMemo(() => {
    const idx = activeAlerts.findIndex((alert) => alert.position === position)
    return idx === activeAlerts.length - 1 && idx === 0
  }, [activeAlerts, position])

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
          <IconButton
            aria-label="close alert"
            color="inherit"
            size="small"
            onClick={collapseHandler(true)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        classes={{
          root: clsx([
            {
              [classes.firstAlert]:
                isFirstAlert &&
                topBgGradient &&
                (!isFirstAndLastAlert ||
                  (isFirstAndLastAlert && !bottomBgGradient)),
              [classes.lastAlert]:
                isLastAlert &&
                bottomBgGradient &&
                (!isFirstAndLastAlert ||
                  (isFirstAndLastAlert && !topBgGradient)),
              [classes.firstAndLastAlert]:
                isFirstAndLastAlert && topBgGradient && bottomBgGradient
            }
          ])
        }}
        {...rest}
      >
        {children}
      </Alert>
    </Collapse>
  )
}
