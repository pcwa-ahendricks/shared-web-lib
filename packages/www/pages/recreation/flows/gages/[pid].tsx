// cspell:ignore Recreationists
import React, {useMemo, useEffect, useCallback, useContext} from 'react'
import {useRouter} from 'next/router'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import {Box, Typography as Type, Hidden} from '@material-ui/core'
import PiNavigationList from '@components/pi/PiNavigationList/PiNavigationList'
import {NextPageContext} from 'next'
import {ParsedUrlQuery} from 'querystring'
import PiNavigationSelect from '@components/pi/PiNavigationSelect/PiNavigationSelect'
import {
  fetchElementStreamSet,
  fetchElementAttributeStream
} from '@lib/services/pi/pi'
import {
  PiContext,
  setStreamSetItems,
  setIsLoadingStreamSetItems,
  setActiveGageItem,
  setChartData,
  updateChartData,
  resetChartData,
  setIsLoadingChartData,
  AttributeStream,
  setTableData,
  updateTableData,
  resetTableData,
  setIsLoadingTableData,
  setChartEndDate
} from '@components/pi/PiStore'
import {format, parseISO, startOfMonth, isToday} from 'date-fns'
import PiMap from '@components/pi/PiMap/PiMap'
import SectionBox from '@components/boxes/SectionBox'
import PiDateRangeControls from '@components/pi/PiDateRangeControls/PiDateRangeControls'
import PiChart from '@components/pi/PiChart/PiChart'
import disclaimer from '@components/pi/disclaimer'
import PiTable from '@components/pi/PiTable/PiTable'
import gages from '@lib/services/pi/gage-config'
import useInterval from '@hooks/useInterval'
const isDev = process.env.NODE_ENV === 'development'

const TABLE_TIME_INTERVAL = '15m'

type Props = {
  query: ParsedUrlQuery // getInitialProps
}

export interface ZippedTableDataItem {
  timestamp: Date
  [attrib: string]:
    | {
        value: number
        units: string
        index: number
      }
    | Date
}

const DynamicPiPage = ({query}: Props) => {
  const router = useRouter()
  const {state, dispatch} = useContext(PiContext)
  const {
    streamSetItems,
    isLoadingStreamSetItems,
    chartInterval,
    chartStartDate,
    chartEndDate,
    activeGageItem,
    chartData,
    tableData
  } = state

  useEffect(() => {
    // dispatch(setChartEndDate(new Date()))
  }, [dispatch])

  const pid = useMemo(() => {
    let {pid: queryPid} = router.query || query.pid
    if (Array.isArray(queryPid)) {
      queryPid = queryPid[0]
    }
    return queryPid
  }, [query, router])

  const fetchStreamSet = useCallback(async () => {
    if (activeGageItem) {
      const ess = await fetchElementStreamSet(
        activeGageItem.baseElement,
        activeGageItem.id
      )
      if (ess && ess.Items) {
        dispatch(setStreamSetItems(ess.Items))
      }
    }
    // Only allow fetching of attribute stream data after fetchElementsStreamSet has completed. This will prevent extra api calls from happening.
    dispatch(setIsLoadingStreamSetItems(false))
  }, [activeGageItem, dispatch])

  const fetchChartAttributeStream = useCallback(async () => {
    dispatch(setIsLoadingChartData(true))
    dispatch(resetChartData()) // Flush previous items.
    try {
      if (
        activeGageItem &&
        streamSetItems.length > 0 &&
        !isLoadingStreamSetItems
      ) {
        activeGageItem.chartValues.map(async (attribute, index) => {
          dispatch(
            setChartData({
              attribute,
              index,
              items: [],
              units: ''
            })
          )
          isDev &&
            console.log(
              `Chart data for ${activeGageItem.id}, ${attribute} | ${format(
                chartStartDate,
                'Pp'
              )} - ${format(chartEndDate, 'Pp')} | ${chartInterval}`
            )
          const eas = await fetchElementAttributeStream(
            streamSetItems,
            attribute,
            chartStartDate.toISOString(),
            chartEndDate.toISOString(),
            chartInterval
          )
          // Deconstruct response.
          const {Items: items = [], UnitsAbbreviation: units = ''} = eas || {}

          if (items.length > 0) {
            dispatch(
              updateChartData({
                attribute,
                index,
                items,
                units
              })
            )
          }
          dispatch(setIsLoadingChartData(false))
        })
      }
    } catch (error) {
      console.log(error)
      dispatch(setIsLoadingChartData(false))
    }
  }, [
    activeGageItem,
    streamSetItems,
    isLoadingStreamSetItems,
    chartStartDate,
    chartEndDate,
    chartInterval,
    dispatch
  ])

  const fetchTableAttributeStream = useCallback(async () => {
    dispatch(setIsLoadingTableData(true))
    dispatch(resetTableData()) // Flush previous items.
    const now = new Date()
    const startDate = startOfMonth(now)
    const endDate = now
    try {
      if (
        activeGageItem &&
        streamSetItems.length > 0 &&
        !isLoadingStreamSetItems
      ) {
        activeGageItem.tableValues.map(async (attribute, index) => {
          dispatch(
            setTableData({
              attribute,
              index,
              items: [],
              units: ''
            })
          )
          isDev &&
            console.log(
              `Table data for ${activeGageItem.id}, ${attribute} | ${format(
                startDate,
                'Pp'
              )} - ${format(endDate, 'Pp')} | ${TABLE_TIME_INTERVAL}`
            )
          const eas = await fetchElementAttributeStream(
            streamSetItems,
            attribute,
            startDate.toISOString(),
            endDate.toISOString(),
            TABLE_TIME_INTERVAL
          )
          // Deconstruct response.
          const {Items: items = [], UnitsAbbreviation: units = ''} = eas || {}

          if (items.length > 0) {
            dispatch(
              updateTableData({
                attribute,
                index,
                items,
                units
              })
            )
          }
          dispatch(setIsLoadingTableData(false))
        })
      }
    } catch (error) {
      console.log(error)
      dispatch(setIsLoadingTableData(false))
    }
  }, [activeGageItem, streamSetItems, isLoadingStreamSetItems, dispatch])

  // Target whenever streamSetItems changes.
  useEffect(() => {
    fetchChartAttributeStream()
  }, [streamSetItems, fetchChartAttributeStream])

  // Target whenever streamSetItems changes. Don't combine this with the useEffect for fetchChartAttributeStream cause we don't want to make a api request every time the chart start/end dates and chart intervals update.
  useEffect(() => {
    fetchTableAttributeStream()
  }, [streamSetItems, fetchTableAttributeStream])

  const timeoutHandler = useCallback(() => {
    isDev && console.log('timer timeout: ', new Date().toLocaleString())
    fetchTableAttributeStream()
    // If the user hasn't changed the end date assume we want to update the chart data as well.
    // Don't place this if block in fetchChartAttributeStream() cause it will result in in infinite (re)renders.
    if (isToday(chartEndDate)) {
      isDev && console.log('Updating chart end date to current date/time.')
      dispatch(setChartEndDate(new Date()))
    }
  }, [fetchTableAttributeStream, chartEndDate, dispatch])

  useInterval(timeoutHandler, 1000 * 60 * 5) // 5 minutes.

  // Target whenever activeGageItem changes.
  useEffect(() => {
    // console.log('effect firing', activeGageItem && activeGageItem.id)
    fetchStreamSet()
  }, [activeGageItem, fetchStreamSet])

  useEffect(() => {
    // console.log('useEffect firing due to pid update.')
    const gci = gages.find((gage) => gage.id === pid)
    if (!gci) {
      return
    }
    dispatch(setIsLoadingChartData(true)) // Assume that attribute streams will be re-fetched as well.
    dispatch(setIsLoadingStreamSetItems(true)) // It is important to kick this off prior to setting active gage item. See note in fetchStreamSet().
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
      const filteredArray: AttributeStream[] = []
      chartData.filter((item) => {
        const i = filteredArray.findIndex((x) => x.index === item.index)
        if (i <= -1) {
          filteredArray.push({...item})
        }
        return null
      })
      return filteredArray.sort((a, b) => a.index - b.index)
    } else {
      return chartData.sort((a, b) => a.index - b.index)
    }
  }, [chartData])

  const zippedTableData = useMemo(
    () =>
      // The following reduce fn will zip an array of arrays.
      // Specifying reduce Type allows us to set the initial value as an array w/o type casting below.
      tableData.reduce<ZippedTableDataItem[]>((prevItems, curr) => {
        // This if check just prevents toLowerCase() below from throwing an error due to undefined method.
        if (!curr.attribute) {
          return []
        }
        const currItems = curr.items

        const newItems = currItems.map((e, i) => {
          // Assume that the timestamp will match when zipping arrays with map.
          const timestamp = parseISO(e.Timestamp)
          // Lowercase attribute for use with <PiTable/>, which will pull data in for a given column based on a lowercase column id.
          return {
            timestamp,
            [`${curr.attribute.toLowerCase()}`]: {
              value: e.Value,
              units: curr.units,
              index: curr.index
            },
            ...prevItems[i]
          }
        })
        return newItems
      }, []),
    [tableData]
  )

  return (
    <PageLayout title="Reservoir & Stream Flows">
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
              <PiMap isLoading={isLoadingStreamSetItems} />
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
              {sortedChartData.map((attribStream) => (
                <PiChart key={attribStream.index} data={attribStream} />
              ))}
            </SectionBox>
            <SectionBox>
              {activeGageItem &&
                activeGageItem.tables.map((table) => (
                  <PiTable
                    key={table.metric}
                    metric={table.metric}
                    headers={table.headers}
                    data={zippedTableData}
                  />
                ))}
            </SectionBox>
          </Box>
        </Box>
      </MainBox>
    </PageLayout>
  )
}

DynamicPiPage.getInitialProps = ({query}: NextPageContext) => {
  isDev && console.log(JSON.stringify(query))
  return {query}
}

export default DynamicPiPage
