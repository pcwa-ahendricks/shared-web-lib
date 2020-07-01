import React, {useMemo, useCallback, useContext, useEffect} from 'react'
import {
  Collapse,
  IconButton,
  lighten,
  darken,
  Theme,
  makeStyles,
  createStyles,
  useTheme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import {Alert, AlertTitle} from '@material-ui/lab'
import CloseIcon from '@material-ui/icons/Close'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MainPhone from '@components/links/MainPhone'
import MuiNextLink from '@components/NextLink/NextLink'
import CollectionsEmail from '@components/links/CollectionsEmail'
import IeOnly from '@components/boxes/IeOnly'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined'
import WebIcon from '@material-ui/icons/Web'
import clsx from 'clsx'
import {UiContext, setAlertHidden, setAlertActive} from '@components/ui/UiStore'

export type AlertsProps = {
  bottomBgGradient?: boolean
  topGbGradient?: boolean
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

export default function Alerts({
  bottomBgGradient = true,
  topGbGradient = true
}: AlertsProps) {
  const theme = useTheme()
  const bgColor = theme.palette.type === 'light' ? lighten : darken
  const uiContext = useContext(UiContext)
  const matchesIe = useMediaQuery(
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)'
  )
  const classes = useStyles({bgColor, matchesIe})
  const {dispatch: uiDispatch, state: uiState} = uiContext
  const {alerts} = uiState
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

  const showAlert = useCallback(
    (pos: number) =>
      activeShownAlerts.findIndex((alert) => alert.position === pos) >= 0,
    [activeShownAlerts]
  )

  const isFirstAlert = useCallback(
    (pos: number) =>
      activeAlerts.findIndex((alert) => alert.position === pos) === 0,
    [activeAlerts]
  )
  const isLastAlert = useCallback(
    (pos: number) => {
      return (
        activeAlerts.findIndex((alert) => alert.position === pos) ===
        activeAlerts.length - 1
      )
    },
    [activeAlerts]
  )
  const isFirstAndLastAlert = useCallback(
    (pos: number) => {
      const idx = activeAlerts.findIndex((alert) => alert.position === pos)
      return idx === activeAlerts.length - 1 && idx === 0
    },
    [activeAlerts]
  )

  const collapseHandler = useCallback(
    (position, hidden) => () => {
      uiDispatch(setAlertHidden({position, hidden}))
    },
    [uiDispatch]
  )

  const exitedHandler = useCallback(
    (position) => () => {
      uiDispatch(setAlertActive({position, active: false}))
    },
    [uiDispatch]
  )

  useEffect(() => {
    const ieAlert = alerts.find((alert) => alert.position === 3)
    if (ieAlert?.active !== matchesIe || ieAlert?.hidden !== !matchesIe) {
      uiDispatch(setAlertActive({position: 3, active: matchesIe}))
      uiDispatch(setAlertHidden({position: 3, hidden: !matchesIe}))
    }
  }, [matchesIe, uiDispatch, alerts])

  return (
    <>
      <Collapse in={showAlert(1)} onExited={exitedHandler(1)}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={collapseHandler(1, true)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={<ErrorOutlineOutlinedIcon />}
          classes={{
            root: clsx([
              {
                [classes.firstAlert]:
                  isFirstAlert(1) &&
                  topGbGradient &&
                  (!isFirstAndLastAlert(1) ||
                    (isFirstAndLastAlert(1) && !bottomBgGradient)),
                [classes.lastAlert]:
                  isLastAlert(1) &&
                  bottomBgGradient &&
                  (!isFirstAndLastAlert(1) ||
                    (isFirstAndLastAlert(1) && !topGbGradient)),
                [classes.firstAndLastAlert]:
                  isFirstAndLastAlert(1) && topGbGradient && bottomBgGradient
              }
            ])
          }}
        >
          <AlertTitle>Help with Bill Payments</AlertTitle>
          Due to financial challenges caused by COVID-19, PCWA is temporarily
          suspending water shutoffs for customers unable to pay their bill. If
          you are having trouble paying your bill please contact Customer
          Services at <CollectionsEmail />.
        </Alert>
      </Collapse>
      <Collapse in={showAlert(2)} onExited={exitedHandler(2)}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={collapseHandler(2, true)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          icon={<HomeWorkOutlinedIcon />}
          classes={{
            root: clsx([
              {
                [classes.firstAlert]:
                  isFirstAlert(2) &&
                  topGbGradient &&
                  (!isFirstAndLastAlert(2) ||
                    (isFirstAndLastAlert(2) && !bottomBgGradient)),
                [classes.lastAlert]:
                  isLastAlert(2) &&
                  bottomBgGradient &&
                  (!isFirstAndLastAlert(2) ||
                    (isFirstAndLastAlert(2) && !topGbGradient)),
                [classes.firstAndLastAlert]:
                  isFirstAndLastAlert(2) && topGbGradient && bottomBgGradient
              }
            ])
          }}
        >
          <AlertTitle>PCWA Business Center Closed </AlertTitle>
          <Type variant="inherit" gutterBottom component="div">
            In an effort to reduce the transmission risk of COVID-19, PCWA has
            closed its business center lobbies until further notice. Staff
            remains available to assist customers by telephone at <MainPhone />{' '}
            or by email at <CustomerServicesEmail />.
          </Type>
          <Type variant="inherit" component="div">
            <MuiNextLink href="/newsroom/covid-19-faqs">
              Frequently Asked Questions
            </MuiNextLink>{' '}
            regarding COVID-19 and your drinking water supply.
          </Type>
        </Alert>
      </Collapse>
      <IeOnly>
        <Collapse in={showAlert(3)} onExited={exitedHandler(3)}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={collapseHandler(3, true)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            icon={<WebIcon />}
            classes={{
              root: clsx([
                {
                  [classes.firstAlert]:
                    isFirstAlert(3) &&
                    topGbGradient &&
                    (!isFirstAndLastAlert(3) ||
                      (isFirstAndLastAlert(3) && !bottomBgGradient)),
                  [classes.lastAlert]:
                    isLastAlert(3) &&
                    bottomBgGradient &&
                    (!isFirstAndLastAlert(3) ||
                      (isFirstAndLastAlert(3) && !topGbGradient)),
                  [classes.firstAndLastAlert]:
                    isFirstAndLastAlert(3) && topGbGradient && bottomBgGradient
                }
              ])
            }}
          >
            <AlertTitle>Note Regarding Web Browser Compatibility</AlertTitle>
            The PCWA website has limited support for Microsoft's Internet
            Explorer 11. Please consider viewing this site with a different Web
            Browser such as Microsoft Edge, Mozilla Firefox, Google Chrome, or
            Apple's Safari.
          </Alert>
        </Collapse>
      </IeOnly>
    </>
  )
}
