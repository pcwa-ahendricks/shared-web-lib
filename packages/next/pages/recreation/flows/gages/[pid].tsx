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
import {getGageById} from '@lib/services/pi/gage-config'
import {
  PiContext,
  setStreamSetItems,
  setIsLoadingStreamSetItems,
  setActiveGageItem,
  setAttributeStreams,
  resetAttributeStreams
} from '@components/pi/PiStore'
import {format} from 'date-fns'
import PiMap from '@components/pi/PiMap/PiMap'
import SectionBox from '@components/boxes/SectionBox'
import PiDateRangeControls from '@components/pi/PiDateRangeControls/PiDateRangeControls'
import PiChartContainer from '@components/pi/PiChartContainer/PiChartContainer'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  query: ParsedUrlQuery // getInitialProps
}

const DynamicPiPage = ({query}: Props) => {
  const router = useRouter()
  const {state, dispatch} = useContext(PiContext)
  const {
    streamSetItems,
    isLoadingStreamSetItems,
    interval,
    startDate,
    endDate,
    activeGageItem,
    attributeStreams
  } = state

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
    // Only allow fetching of attribute stream data after fetchElementsStreamSet has completed.
    dispatch(setIsLoadingStreamSetItems(false))
  }, [activeGageItem, dispatch])

  const fetchAttributeStream = useCallback(async () => {
    if (
      activeGageItem &&
      streamSetItems.length > 0 &&
      !isLoadingStreamSetItems
    ) {
      dispatch(resetAttributeStreams()) // Flush previous items.
      activeGageItem.chartValues.map(async (chartValue, index) => {
        isDev &&
          console.log(
            `fetchElementAttributeStream() for ${activeGageItem.id} | ${format(
              startDate,
              'Pp'
            )} - ${format(endDate, 'Pp')} | ${interval}`
          )
        const eas = await fetchElementAttributeStream(
          streamSetItems,
          chartValue,
          startDate.toISOString(),
          endDate.toISOString(),
          interval
        )
        if (eas && eas.Items && Array.isArray(eas.Items)) {
          dispatch(setAttributeStreams(chartValue, index, eas.Items))
        }
        // console.log(eas)
        // if (be && be.Items) {
        //   dispatch(setStreamSetItems(be.Items))
        // }
      })
    }
  }, [
    activeGageItem,
    streamSetItems,
    isLoadingStreamSetItems,
    startDate,
    endDate,
    interval,
    dispatch
  ])

  // Target whenever streamSetItems changes.
  useEffect(() => {
    fetchAttributeStream()
  }, [streamSetItems, fetchAttributeStream])

  // Target whenever attributeStreamItems changes.
  useEffect(() => {
    console.log(
      'effect firing for changes in attributeStreams',
      attributeStreams
    )
  }, [attributeStreams])

  // Target whenever activeGageItem changes.
  useEffect(() => {
    // console.log('effect firing', activeGageItem && activeGageItem.id)
    fetchStreamSet()
  }, [activeGageItem, fetchStreamSet])

  useEffect(() => {
    // console.log('useEffect firing due to pid update.')
    const gci = getGageById(pid)
    dispatch(setIsLoadingStreamSetItems(true)) // It is important to kick this off prior to setting active gage item.
    dispatch(setActiveGageItem(gci))
  }, [pid, dispatch])

  // Protect route from accessing disabled gages.
  useEffect(() => {
    if (activeGageItem && activeGageItem.disabled) {
      router.replace('/404')
    }
  }, [activeGageItem, router])

  return (
    <PageLayout title="Reservoir & Stream Flows">
      <MainBox>
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
                PCWA does not assume any legal responsibility for the accuracy
                of the information on this site. The information consists of
                estimates of stream flows and reservoir levels. Actual stream
                flows and reservoir levels may vary significantly from the
                estimates provided. Many factors affect flows and reservoir
                levels, including weather, snowmelt runoff, and the operating
                requirements of the hydro project. Reservoir and river
                recreation can be hazardous. Recreationists have the sole
                responsibility to determine whether conditions are safe to enter
                the water, and they thereby assume full risk of serious bodily
                injury and/or death.
              </Type>
              <Type paragraph variant="body2">
                Note Regarding Units - All river stage heights and reservoir
                elevations are in Feet. All river flow values are in Cubic Feet
                Per Second (CFS). All reservoir storage values are in Acre Feet.
              </Type>
            </SectionBox>
            <SectionBox>
              <PiDateRangeControls />
            </SectionBox>
            <SectionBox>
              <PiChartContainer />
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
