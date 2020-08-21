import React, {useState, useContext, useEffect, useMemo} from 'react'
import {Typography as Type} from '@material-ui/core'
import {AlertTitle, AlertProps} from '@material-ui/lab'
// import CustomerServicesEmail from '@components/links/CustomerServicesEmail'
// import MainPhone from '@components/links/MainPhone'
import MuiNextLink from '@components/NextLink/NextLink'
import CollectionsEmail from '@components/links/CollectionsEmail'
import IeOnly from '@components/boxes/IeOnly'
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined'
import HomeWorkOutlinedIcon from '@material-ui/icons/HomeWorkOutlined'
import HelpIcon from '@material-ui/icons/HelpOutline'
import WebIcon from '@material-ui/icons/Web'
import {UiContext, setAlertHidden, setAlertActive} from '@components/ui/UiStore'
import CollapsibleAlert from './CollapsibleAlert'
import useMatchesIe from '@hooks/useMatchesIe'
import useSWR from 'swr'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export type AlertsProps = {
  bottomBgGradient?: boolean
  topBgGradient?: boolean
  initialData?: CosmicObjectResponse<OutageMetadata>
}

interface OutageMetadata {
  collapsible: boolean
  heading: '<p>PCWA Business Center Open</p>'
  material_ui_icon_family: string
  material_ui_icon_name: string
  position: number
  severity: AlertProps['severity']
}

const params = {
  hide_metafields: true,
  props: '_id,content,metadata,status,title',
  type: 'alerts'
}

const qs = stringify({...params}, true)
const alertsUrl = `/api/cosmic/objects${qs}`

const refreshInterval = 1000 * 60 * 2 // Two minute interval.

export default function Alerts({
  bottomBgGradient,
  topBgGradient,
  initialData
}: AlertsProps) {
  const uiContext = useContext(UiContext)
  const matchesIe = useMatchesIe()
  const {dispatch: uiDispatch, state: uiState} = uiContext
  const {alerts} = uiState
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  useEffect(() => {
    // If client is IE11 skip so alerts don't get re-activated and re-shown.
    if (matchesIe || !ready) {
      return
    }
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
  }, [matchesIe, uiDispatch, alerts, ready])

  const {data: alertsData} = useSWR<CosmicObjectResponse<OutageMetadata>>(
    alertsUrl,
    {
      initialData,
      refreshInterval
    }
  )
  console.log(alertsData)
  const fetchedAlerts = useMemo(
    () =>
      alertsData && Array.isArray(alertsData?.objects)
        ? alertsData.objects.map(({metadata, content, _id}) => ({
            ...metadata,
            content,
            _id
          }))
        : [],
    [alertsData]
  )
  console.log(fetchedAlerts)

  return (
    <>
      {fetchedAlerts.map((alert) => (
        <CollapsibleAlert
          key={alert._id}
          bottomBgGradient={bottomBgGradient}
          topBgGradient={topBgGradient}
          position={alert.position}
          severity={alert.severity}
        >
          <AlertTitle>{alert.heading}</AlertTitle>
          {alert.content}
        </CollapsibleAlert>
      ))}
      <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={1}
        severity="info"
        icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>PCWA Business Center Open</AlertTitle>
        {/* <Type variant="inherit" gutterBottom component="div"> */}
        The PCWA business center lobby is open 8am to 5pm, Monday – Friday. Per
        state and county guidelines related to COVID-19, visitors must wear face
        masks when inside the business center.
        {/* Please contact Customer Services */}
        {/* with any questions at <MainPhone /> or by email at{' '} */}
        {/* <CustomerServicesEmail underline="always" />.
        </Type> */}
      </CollapsibleAlert>
      <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={2}
        severity="warning"
        icon={<ErrorOutlineOutlinedIcon />}
      >
        <AlertTitle>Help with Bill Payments</AlertTitle>
        Due to financial challenges caused by COVID-19, PCWA is temporarily
        suspending water shutoffs for customers unable to pay their bill. If you
        are having trouble paying your bill please contact Customer Services at{' '}
        <CollectionsEmail underline="always" />.
      </CollapsibleAlert>
      <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={3}
        severity="warning"
        icon={<HelpIcon />}
      >
        <AlertTitle>COVID-19 and Your Drinking Water</AlertTitle>
        <Type variant="inherit" component="div">
          See our{' '}
          <MuiNextLink href="/newsroom/covid-19-faqs" underline="always">
            Frequently Asked Questions
          </MuiNextLink>
          {/* {' '} */}
          {/* regarding COVID-19 and your drinking water supply. */}
        </Type>
      </CollapsibleAlert>
      {/* <CollapsibleAlert
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
      </CollapsibleAlert> */}
      <IeOnly>
        <CollapsibleAlert
          position={0}
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
