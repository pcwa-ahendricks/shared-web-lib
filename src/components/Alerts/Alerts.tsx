import React, {useContext, useEffect} from 'react'
import {Typography as Type} from '@material-ui/core'
import {AlertTitle} from '@material-ui/lab'
import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
import MainPhone from '@components/links/MainPhone'
import MuiNextLink from '@components/NextLink/NextLink'
import CollectionsEmail from '@components/links/CollectionsEmail'
import IeOnly from '@components/boxes/IeOnly'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined'
import WebIcon from '@material-ui/icons/Web'
import {UiContext, setAlertHidden, setAlertActive} from '@components/ui/UiStore'
import CollapsibleAlert from './CollapsibleAlert'
import useMatchesIe from '@hooks/useMatchesIe'

export type AlertsProps = {
  bottomBgGradient?: boolean
  topBgGradient?: boolean
}

export default function Alerts({bottomBgGradient, topBgGradient}: AlertsProps) {
  const uiContext = useContext(UiContext)
  const matchesIe = useMatchesIe()
  const {dispatch: uiDispatch, state: uiState} = uiContext
  const {alerts} = uiState

  useEffect(() => {
    // If client is not IE11 hide and inactivate IE only alerts.
    alerts
      .filter((alert) => alert.ieOnly)
      .map((ieAlert) => {
        if (ieAlert?.active !== matchesIe) {
          uiDispatch(
            setAlertActive({position: ieAlert.position, active: matchesIe})
          )
        }
        return ieAlert
      })
      .map((ieAlert) => {
        if (ieAlert?.hidden !== !matchesIe) {
          uiDispatch(
            setAlertHidden({position: ieAlert.position, hidden: !matchesIe})
          )
        }
        return ieAlert
      })
  }, [matchesIe, uiDispatch, alerts])

  return (
    <>
      <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={1}
        severity="warning"
        icon={<ErrorOutlineOutlinedIcon />}
      >
        <AlertTitle>Help with Bill Payments</AlertTitle>
        Due to financial challenges caused by COVID-19, PCWA is temporarily
        suspending water shutoffs for customers unable to pay their bill. If you
        are having trouble paying your bill please contact Customer Services at{' '}
        <CollectionsEmail />.
      </CollapsibleAlert>
      <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={2}
        severity="warning"
        icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>PCWA Business Center Closed </AlertTitle>
        <Type variant="inherit" gutterBottom component="div">
          In an effort to reduce the transmission risk of COVID-19, PCWA has
          closed its business center lobbies until further notice. Staff remains
          available to assist customers by telephone at <MainPhone /> or by
          email at <CustomerServicesEmail />.
        </Type>
        <Type variant="inherit" component="div">
          <MuiNextLink href="/newsroom/covid-19-faqs">
            Frequently Asked Questions
          </MuiNextLink>{' '}
          regarding COVID-19 and your drinking water supply.
        </Type>
      </CollapsibleAlert>
      <IeOnly>
        <CollapsibleAlert
          position={3}
          ieOnly
          bottomBgGradient={bottomBgGradient}
          topBgGradient={topBgGradient}
          severity="warning"
          icon={<WebIcon />}
        >
          <AlertTitle>Note Regarding Web Browser Compatibility</AlertTitle>
          The PCWA website has limited support for Microsoft's Internet Explorer
          11. Please consider viewing this site with a different Web Browser
          such as Microsoft Edge, Mozilla Firefox, Google Chrome, or Apple's
          Safari.
        </CollapsibleAlert>
      </IeOnly>
    </>
  )
}
