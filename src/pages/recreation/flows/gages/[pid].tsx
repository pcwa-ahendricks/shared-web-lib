// cspell:ignore recreationists essd streamset streamsets
import React, {useMemo, useEffect, useCallback, useContext} from 'react'
import {useRouter} from 'next/router'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import {
  Box,
  Typography as Type,
  Hidden,
  Paper,
  useTheme
} from '@material-ui/core'
import PiNavigationList from '@components/pi/PiNavigationList/PiNavigationList'
import {GetStaticPaths, GetStaticProps} from 'next'
import PiNavigationSelect from '@components/pi/PiNavigationSelect/PiNavigationSelect'
import {
  PiContext,
  setActiveGageItem,
  setChartEndDate
} from '@components/pi/PiStore'
import {isToday} from 'date-fns'
import PiMap from '@components/pi/PiMap/PiMap'
import SectionBox from '@components/boxes/SectionBox'
import PiDateRangeControls from '@components/pi/PiDateRangeControls/PiDateRangeControls'
import PiChart from '@components/pi/PiChart/PiChart'
import disclaimer from '@components/pi/disclaimer'
import PiTable from '@components/pi/PiTable/PiTable'
import gages from '@lib/services/pi/gage-config'
import {paramToStr} from '@lib/queryParamToStr'
import useSWR from 'swr'
import {
  PiWebElementStreamSetResponse,
  Value
} from '@lib/services/pi/pi-web-api-types'
import fetcher from '@lib/fetcher'
import {ChildBox, RowBox} from 'mui-sleazebox'
import withTimeout from '@lib/withTimeout'
import round from '@lib/round'
import JackinBox from 'mui-jackinbox'
import Spacing from '@components/boxes/Spacing'
import {useInterval} from 'react-use'
// import CollapsibleAlert from '@components/Alerts/CollapsibleAlert'
// import {AlertTitle} from '@material-ui/lab'
const isDev = process.env.NODE_ENV === 'development'
export const spacesRe = /(\s|%20)+/g

export const piApiUrl = isDev
  ? 'http://localhost:3001'
  : 'https://flow.pcwa.net'

type Props = {
  pid?: string
  initialElementsStreamSetData?: PiWebElementStreamSetResponse
  initialCurrentElevationData?: Value
}

const getActiveGage = (pid: string) =>
  gages.find(({id = ''}) => id.toLowerCase().replace(spacesRe, '-') === pid)

export interface ZippedTableDataItem {
  id: string
  timestamp: Date
  values: {
    value: number
    attribute: string
    columnNo: number
    units?: string
  }[]
}

const DynamicPiPage = ({
  pid: pidParam = '',
  initialElementsStreamSetData,
  initialCurrentElevationData
}: Props) => {
  const pid = pidParam.replace(spacesRe, '-').toLowerCase()
  const router = useRouter()
  const {state, dispatch} = useContext(PiContext)
  const {chartStartDate, chartEndDate, activeGageItem} = state
  const isReservoir = activeGageItem?.type === 'reservoir'

  const url = `${piApiUrl}/${isReservoir ? 'reservoirs' : 'gages'}/${
    activeGageItem?.id
  }`
  const {data: elementsStreamSetData, isValidating: essdIsValidating} =
    useSWR<PiWebElementStreamSetResponse>(activeGageItem?.id ? url : null, {
      fallbackData: initialElementsStreamSetData
    })

  const essdItems = useMemo(
    () =>
      elementsStreamSetData && elementsStreamSetData?.Items
        ? elementsStreamSetData?.Items
        : [],
    [elementsStreamSetData]
  )

  const names = essdItems.map((item) => item.Name)
  const values = essdItems.map((item) => item.Value)
  // Zip up metadata. If we need to filter "Questionable" data this is where we would start, at least for the streamSetMeta.
  const streamSetMeta = useMemo(
    () => names.map((e, idx) => ({name: e, value: values[idx].Value})),
    [names, values]
  )

  const unsortedCharts = useMemo(
    () =>
      activeGageItem && Array.isArray(activeGageItem.chartValues)
        ? activeGageItem.chartValues.map((attribute, index) => ({
            index,
            attribute,
            gageId: activeGageItem.id,
            webId:
              essdItems.find((item) => item.Name === attribute)?.WebId ?? ''
          }))
        : [],
    [activeGageItem, essdItems]
  )

  const timeoutHandler = useCallback(() => {
    isDev && console.log('timer timeout: ', new Date().toLocaleString())
    // If the user hasn't changed the end date assume we want to update the chart data as well.
    // Don't place this if block in fetchChartAttributeStream() cause it will result in in infinite (re)renders.
    if (isToday(chartEndDate)) {
      isDev && console.log('Updating chart end date to current date/time.')
      dispatch(setChartEndDate(new Date()))
    }
  }, [chartEndDate, dispatch])

  useInterval(timeoutHandler, 1000 * 60 * 5) // 5 minutes.

  useEffect(() => {
    // console.log('useEffect firing due to pid update.')
    // Need to compare id to modified pid returned from getStaticProps.
    const gci = getActiveGage(pid)
    if (!gci) {
      return
    }
    dispatch(setActiveGageItem(gci))
  }, [pid, dispatch])

  // Protect route from accessing disabled gages.
  useEffect(() => {
    if (activeGageItem && activeGageItem.disabled) {
      router.replace('/404')
    }
  }, [activeGageItem, router])

  const sortedChartData = useMemo(() => {
    // [hack] Hot reloading during development messes up the uniqueness of the array of objects. This is addressed with the if block.
    if (isDev) {
      const filteredArray: typeof unsortedCharts = []
      unsortedCharts.filter((item) => {
        const i = filteredArray.findIndex((x) => x.index === item.index)
        if (i <= -1) {
          filteredArray.push({...item})
        }
        return null
      })
      return filteredArray.sort((a, b) => a.index - b.index)
    } else {
      return unsortedCharts.sort((a, b) => a.index - b.index)
    }
  }, [unsortedCharts])

  // console.log('TBL Data', tableData)
  // console.log('ZPD Data', zippedTableData)

  const {data: elevationData} = useSWR<Value>(
    isReservoir
      ? `${piApiUrl}/reservoir-attr/${activeGageItem?.id}/elevation`
      : null,
    {
      refreshInterval: 1000 * 60 * 5,
      fallbackData: initialCurrentElevationData
    } // five minute interval
  )

  const {Value: currentElevation} = elevationData ?? {}

  const theme = useTheme()

  return (
    <PageLayout
      title="Reservoir & Stream Flows"
      mt={0}
      alertsProps={{bottomBgGradient: false}}
    >
      {/* <CollapsibleAlert
        bottomBgGradient={false}
        topBgGradient={false}
        position={101} // Don't conflict with Cosmic alerts. Use 101-199 for page specific alerts.
        severity="error"
        // icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>Scheduled Maintenance for River Flows Page</AlertTitle>
        PCWA River Flows will be unavailable due to scheduled maintenance on
        Tuesday, October 19th from 6:00am until 12:00pm.
      </CollapsibleAlert> */}
      {/* <CollapsibleAlert
        bottomBgGradient={false}
        topBgGradient={false}
        position={101} // Don't conflict with Cosmic alerts. Use 101-199 for page specific alerts.
        severity="error"
        // icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>PCWA River Flows Page is Offline</AlertTitle>
        PCWA River Flows page is currently offline. We are currently working on
        troubleshooting this and hope to have the service back online shortly.
      </CollapsibleAlert> */}
      {/* Don't use top margin with this page. */}
      <MainBox mt={0}>
        {/* <PageTitle title="..." subtitle="..." /> */}
        <RowBox responsive="sm">
          {/* Using js implementation here will cause Highcharts to load charts with wrong width. CSS implementation is faster anyways. */}
          <Hidden smDown implementation="css">
            <Box width={300} flexShrink={0} flexGrow={0}>
              <PiNavigationList pid={pid} />
            </Box>
          </Hidden>
          <Box flex="1 1 auto">
            <Hidden mdUp implementation="css">
              <Box m={3}>
                <PiNavigationSelect pid={pid} />
              </Box>
            </Hidden>
            {/* <Type variant="subtitle1">Post: {pid}</Type> */}
            <SectionBox height={400}>
              <PiMap
                isLoading={essdIsValidating}
                streamSetMeta={streamSetMeta}
              />
            </SectionBox>
            <SectionBox m={3}>
              <Type
                variant="subtitle1"
                style={{textTransform: 'uppercase'}}
                gutterBottom
              >
                Disclaimer:
              </Type>
              <Type paragraph variant="body2">
                {disclaimer.p1}
              </Type>
              <Type paragraph variant="body2">
                {disclaimer.p2}
              </Type>
            </SectionBox>
            {isReservoir ? (
              <Box m={3}>
                <Paper>
                  <Box bgcolor={theme.palette.common.white} p={3}>
                    <Type variant="subtitle2">
                      Current Reservoir Conditions
                    </Type>
                    <Spacing size="x-small" />
                    <RowBox justifyContent="space-around">
                      <ChildBox>
                        <JackinBox
                          name="fadeIn"
                          hideUntilAnimate
                          animate={typeof currentElevation === 'number'}
                        >
                          <Type variant="caption">
                            Reservoir Elevation:{' '}
                            {round(
                              typeof currentElevation === 'number'
                                ? currentElevation
                                : 0,
                              1
                            ).toLocaleString()}{' '}
                            ft.
                          </Type>
                        </JackinBox>
                      </ChildBox>
                      <ChildBox>
                        <Type variant="caption">
                          Minimum Boat Ramp Elevation:{' '}
                          {activeGageItem?.boatRampElev?.toLocaleString()} ft.
                        </Type>
                      </ChildBox>
                    </RowBox>
                  </Box>
                </Paper>
              </Box>
            ) : null}
            <SectionBox>
              <PiDateRangeControls />
            </SectionBox>
            <SectionBox>
              {sortedChartData.map(({index, webId, attribute}) => (
                <PiChart
                  key={index}
                  webId={webId}
                  startTime={chartStartDate}
                  endTime={chartEndDate}
                  attribute={attribute}
                  streamSetMeta={streamSetMeta}
                />
              ))}
            </SectionBox>
            <SectionBox>
              {activeGageItem &&
                activeGageItem.tables.map((table) => (
                  <PiTable
                    key={table.metric}
                    metric={table.metric}
                    headers={table.headers}
                    streamSetItems={essdItems}
                    streamSetMeta={streamSetMeta}
                  />
                ))}
            </SectionBox>
          </Box>
        </RowBox>
      </MainBox>
    </PageLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({
//   query,
//   req,
//   res
// }) => {
//   try {
//     isDev && console.log(JSON.stringify(query))
//     // Allow parameter to use dashes for spaces (eg. "french-meadows"). The "id" property in gage-config.ts will use the original PI Id, with spaces. Since we are addressing the space issue here we will also convert parameters to lowercase.
//     const pidParam = queryParamToStr(query['pid'])
//     const pid = pidParam.replace(spacesRe, '-').toLowerCase()

//     // If the pid parameter had a space update the URL so that dashes show in the URL bar.
//     if (pidParam !== pid) {
//       const {url = ''} = req
//       const newLocation = url.replace(spacesRe, '-').toLowerCase()
//       res.writeHead(302, {
//         Location: newLocation
//       })
//       res.end()
//     }

//     return {props: {pid}}
//   } catch (error) {
//     console.log('There was an error fetching PI data.', error)
//     return {props: {}}
//   }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  // const paths = gages
  //   .filter((g) => !g.disabled) // No disabled gages.
  //   .map(({id = ''}) => id.toLowerCase().replace(spacesRe, '-')) // URL paths should be lowercase w/o spaces.
  //   .map((id) => ({
  //     params: {pid: id}
  //   }))

  return {
    paths: [],
    // fallback: false
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    isDev && console.log(JSON.stringify(params))
    // Allow parameter to use dashes for spaces (eg. "french-meadows"). The "id" property in gage-config.ts will use the original PI Id, with spaces. Since we are addressing the space issue here we will also convert parameters to lowercase.
    const pid = paramToStr(params?.pid)

    const activeGageItem = getActiveGage(pid)
    const isReservoir = activeGageItem?.type === 'reservoir'
    const timeout = 8000
    const elementsStreamSetDataUrl = `${piApiUrl}/${
      isReservoir ? 'reservoirs' : 'gages'
    }/${activeGageItem?.id}`
    const fetchOptions = {
      headers: {
        Referer: isDev ? 'http://localhost:3000' : 'https://www.pcwa.net'
      }
    }

    const initialElementsStreamSetData = activeGageItem?.id
      ? await withTimeout<PiWebElementStreamSetResponse>(
          timeout,
          fetcher(elementsStreamSetDataUrl, fetchOptions)
        )
      : null

    // current elevation
    const elevationUrl = `${piApiUrl}/reservoir-attr/${activeGageItem?.id}/elevation`
    const initialCurrentElevationData = isReservoir
      ? await withTimeout<Value>(
          timeout,
          fetcher<Value>(elevationUrl, fetchOptions)
        )
      : null
    /* */

    return {
      props: {
        pid,
        initialElementsStreamSetData,
        initialCurrentElevationData
      },
      revalidate: 5
    }
  } catch (error) {
    console.log('There was an error fetching PI data.', error)
    return {props: {}}
  }
}

export default DynamicPiPage
