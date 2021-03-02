import React, {useState, useContext, useEffect, useMemo} from 'react'
import {AlertTitle, AlertProps} from '@material-ui/lab'
import IeOnly from '@components/boxes/IeOnly'
import WebIcon from '@material-ui/icons/Web'
import {UiContext, setAlertHidden, setAlertActive} from '@components/ui/UiStore'
import CollapsibleAlert, {CollapsibleCosmicAlert} from './CollapsibleAlert'
import useMatchesIe from '@hooks/useMatchesIe'
import useSWR from 'swr'
import {CosmicObjectResponse} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

export type AlertsProps = {
  bottomBgGradient?: boolean
  topBgGradient?: boolean
  initialData?: CosmicObjectResponse<AlertMetadata>
}

interface AlertMetadata {
  collapsible: boolean
  heading: string
  material_ui_icon_family: {key: string; value: string}
  material_ui_icon_name: string
  position: number
  severity: {key: string; value: AlertProps['severity']}
  hidden: boolean
}

const params = {
  hide_metafields: true,
  props: 'id,content,metadata,status,title',
  query: JSON.stringify({
    type: 'alerts'
  })
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
  const {alerts: alertsState} = uiState
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
    alertsState
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
  }, [matchesIe, uiDispatch, alertsState, ready])

  const {data: alertsData} = useSWR<CosmicObjectResponse<AlertMetadata>>(
    alertsUrl,
    {
      refreshInterval,
      initialData
    }
  )
  const alerts = useMemo(
    () =>
      alertsData && Array.isArray(alertsData?.objects)
        ? alertsData.objects
            .filter((a) => !a.metadata.hidden)
            .map(({metadata, content, id}) => ({
              ...metadata,
              content,
              id
            }))
            .sort((a, b) => a.position - b.position)
        : [],
    [alertsData]
  )

  return (
    <>
      {alerts.map((alert) => (
        <CollapsibleCosmicAlert
          key={alert.id}
          bottomBgGradient={bottomBgGradient}
          topBgGradient={topBgGradient}
          position={alert.position}
          severity={alert.severity.value}
          muiIconName={alert.material_ui_icon_name}
          muiIconFamily={alert.material_ui_icon_family.value}
          headingHtmlStr={alert.heading}
          contentHtmlStr={alert.content}
          collapsible={alert.collapsible}
        />
      ))}

      {/* <CollapsibleAlert
        bottomBgGradient={bottomBgGradient}
        topBgGradient={topBgGradient}
        position={1}
        severity="info"
        icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>PCWA Business Center Open</AlertTitle>
        The PCWA business center lobby is open 8am to 5pm, Monday – Friday. Per
        state and county guidelines related to COVID-19, visitors must wear face
        masks when inside the business center.
      </CollapsibleAlert>  */}

      {/* <CollapsibleAlert
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
      </CollapsibleAlert> */}

      {/* <CollapsibleAlert
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
        </Type>
      </CollapsibleAlert> */}

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
