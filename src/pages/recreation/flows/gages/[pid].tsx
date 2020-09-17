// cspell:ignore recreationists essd streamset streamsets
import React, {useMemo, useEffect, useCallback, useContext} from 'react'
import {useRouter} from 'next/router'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import {Box, Typography as Type, Hidden} from '@material-ui/core'
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
import useInterval from '@hooks/useInterval'
import {paramToStr} from '@lib/queryParamToStr'
import useSWR from 'swr'
import {
  PiWebBaseElementsResponse,
  PiWebElementsResponse,
  PiWebElementStreamSetResponse
} from '@lib/services/pi/pi-web-api-types'
import {stringify} from 'querystringify'
import fetcher from '@lib/fetcher'
import CollapsibleAlert from '@components/Alerts/CollapsibleAlert'
import {AlertTitle} from '@material-ui/lab'
const isDev = process.env.NODE_ENV === 'development'
export const spacesRe = /(\s|%20)+/g

export const piApiUrl = 'https://flows.pcwa.net/piwebapi'
// const qs = stringify({path: baseElementType}, true)
// const url = `${baseUrl}/elements${qs}`

type Props = {
  pidParam?: string
  initialBaseData?: PiWebBaseElementsResponse
  initialElementsData?: PiWebElementsResponse
  initialElementsStreamSetData?: PiWebElementStreamSetResponse
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
  pidParam = '',
  initialBaseData,
  initialElementsData,
  initialElementsStreamSetData
}: Props) => {
  const pid = pidParam.replace(spacesRe, '-').toLowerCase()
  const router = useRouter()
  const {state, dispatch} = useContext(PiContext)
  const {chartStartDate, chartEndDate, activeGageItem} = state

  /* Request 1 */
  const qs = stringify({path: activeGageItem?.baseElement}, true)
  const baseDataUrl = `${piApiUrl}/elements${qs}`
  const {data: baseData} = useSWR<PiWebBaseElementsResponse>(
    activeGageItem?.baseElement ? baseDataUrl : null,
    {initialData: initialBaseData}
  )
  /* */
  /* Request 2 */
  const elementsDataUrl = `${piApiUrl}/elements/${baseData?.WebId}/elements`
  const {data: elementsData} = useSWR<PiWebElementsResponse>(
    baseData?.WebId ? elementsDataUrl : null,
    {initialData: initialElementsData}
  )
  /* */
  /* Request 3 */
  const elementDataItems = useMemo(() => elementsData?.Items ?? [], [
    elementsData
  ])
  const activeElementData = useMemo(
    () => elementDataItems.find((item) => item.Name === activeGageItem?.id),
    [elementDataItems, activeGageItem?.id]
  )
  const elementsStreamSetDataUrl = `${piApiUrl}/streamsets/${activeElementData?.WebId}/value`
  const {data: elementsStreamSetData, isValidating: essdIsValidating} = useSWR<
    PiWebElementStreamSetResponse
  >(activeElementData?.WebId ? elementsStreamSetDataUrl : null, {
    initialData: initialElementsStreamSetData
  })
  /* */

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

  return (
    <PageLayout
      title="Reservoir & Stream Flows"
      mt={0}
      alertsProps={{bottomBgGradient: false}}
    >
      <CollapsibleAlert
        bottomBgGradient={false}
        topBgGradient={false}
        position={101} // Don't conflict with Cosmic alerts. Use 101-199 for page specific alerts.
        severity="error"
        // icon={<HomeWorkOutlinedIcon />}
      >
        <AlertTitle>Scheduled Maintenance for River Flows Page</AlertTitle>
        PCWA River Flows will be unavailable due to scheduled maintenance on
        Monday, September 21st from 6:00am until 12:00pm.
      </CollapsibleAlert>
      {/* Don't use top margin with this page. */}
      <MainBox mt={0}>
        {/* <PageTitle title="..." subtitle="..." /> */}
        <Box
          display="flex"
          flexDirection={{xs: 'column', sm: 'column', md: 'row'}}
        >
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
        </Box>
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
  const paths = gages
    .filter((g) => !g.disabled) // No disabled gages.
    .map(({id = ''}) => id.toLowerCase().replace(spacesRe, '-')) // URL paths should be lowercase w/o spaces.
    .map((id) => ({
      params: {pid: id}
    }))

  return {
    paths: [...paths],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  try {
    isDev && console.log(JSON.stringify(params))
    // Allow parameter to use dashes for spaces (eg. "french-meadows"). The "id" property in gage-config.ts will use the original PI Id, with spaces. Since we are addressing the space issue here we will also convert parameters to lowercase.
    const pidParam = paramToStr(params?.pid)

    /* Get Initial Data */
    // 1
    const pid = pidParam.replace(spacesRe, '-').toLowerCase()
    const activeGageItem = getActiveGage(pid)
    const qs = stringify({path: activeGageItem?.baseElement}, true)
    const baseDataUrl = `${piApiUrl}/elements${qs}`
    const initialBaseData = activeGageItem?.baseElement
      ? await fetcher<PiWebBaseElementsResponse>(baseDataUrl)
      : null
    // 2
    const elementsDataUrl = `${piApiUrl}/elements/${initialBaseData?.WebId}/elements`
    const initialElementsData = initialBaseData?.WebId
      ? await fetcher<PiWebElementsResponse>(elementsDataUrl)
      : null
    // 3
    const elementDataItems = initialElementsData?.Items ?? []
    const activeElementData = elementDataItems.find(
      (item) => item.Name === activeGageItem?.id
    )
    const elementsStreamSetDataUrl = `${piApiUrl}/streamsets/${activeElementData?.WebId}/value`
    const initialElementsStreamSetData = activeElementData?.WebId
      ? await fetcher<PiWebElementStreamSetResponse>(elementsStreamSetDataUrl)
      : null
    /* */

    return {
      props: {
        pidParam,
        initialBaseData,
        initialElementsData,
        initialElementsStreamSetData
      }
    }
  } catch (error) {
    console.log('There was an error fetching PI data.', error)
    return {props: {}}
  }
}

export default DynamicPiPage
