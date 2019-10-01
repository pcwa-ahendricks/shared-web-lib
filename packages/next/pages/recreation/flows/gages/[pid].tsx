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
  resetAttributeStreams,
  AttributeStream
} from '@components/pi/PiStore'
import {format} from 'date-fns'
import PiMap from '@components/pi/PiMap/PiMap'
import SectionBox from '@components/boxes/SectionBox'
import PiDateRangeControls from '@components/pi/PiDateRangeControls/PiDateRangeControls'
import PiChart from '@components/pi/PiChart/PiChart'
import disclaimer from '@components/pi/disclaimer'
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
      activeGageItem.chartValues.map(async (attribute, index) => {
        isDev &&
          console.log(
            `fetchElementAttributeStream() for ${activeGageItem.id} | ${format(
              startDate,
              'Pp'
            )} - ${format(endDate, 'Pp')} | ${interval}`
          )
        const eas = await fetchElementAttributeStream(
          streamSetItems,
          attribute,
          startDate.toISOString(),
          endDate.toISOString(),
          interval
        )
        // Deconstruct response.
        const {Items: items = [], UnitsAbbreviation: units = ''} = eas || {}

        if (items.length > 0) {
          dispatch(
            setAttributeStreams({
              attribute,
              index,
              items,
              units
            })
          )
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

  const sortedAttributeStreams = useMemo(() => {
    // [hack] Hot reloading during development messes up the uniqueness of the array of objects. This is addressed with the if block.
    if (isDev) {
      const filteredArray: AttributeStream[] = []
      attributeStreams.filter((item) => {
        const i = filteredArray.findIndex((x) => x.index === item.index)
        if (i <= -1) {
          filteredArray.push({...item})
        }
        return null
      })
      return filteredArray.sort((a, b) => a.index - b.index)
    } else {
      return attributeStreams.sort((a, b) => a.index - b.index)
    }
  }, [attributeStreams])

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
              {sortedAttributeStreams.map((attribStream) => (
                <PiChart key={attribStream.index} data={attribStream} />
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
