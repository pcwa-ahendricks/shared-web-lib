import React, {
  useMemo,
  useEffect,
  useCallback,
  useState,
  useContext
} from 'react'
import {useRouter} from 'next/router'
import MainBox from '@components/boxes/MainBox'
import PageLayout from '@components/PageLayout/PageLayout'
import {Box, Typography as Type, Hidden} from '@material-ui/core'
import PiNavigationList from '@components/pi/PiNavigationList/PiNavigationList'
import {NextPageContext} from 'next'
import {ParsedUrlQuery} from 'querystring'
import {RowBox} from '@components/boxes/FlexBox'
import PiNavigationSelect from '@components/pi/PiNavigationSelect/PiNavigationSelect'
import {
  fetchElementStreamSet,
  fetchElementAttributeStream
} from '@lib/services/pi/pi'
import {getGageById, GageConfigItem} from '@lib/services/pi/gage-config'
import {
  PiContext,
  setStreamSetItems,
  setCanFetchAttributeStream
} from '@components/pi/PiStore'
import {format} from 'date-fns'
const isDev = process.env.NODE_ENV === 'development'

type Props = {
  query: ParsedUrlQuery // getInitialProps
}

const DynamicPiPage = ({query}: Props) => {
  const router = useRouter()
  const [activeGageItem, setActiveGageItem] = useState<GageConfigItem>()
  const {state, dispatch} = useContext(PiContext)
  const {
    streamSetItems,
    canFetchAttributeStream,
    interval,
    startDate,
    endDate
  } = state
  // console.log(router)

  const pid = useMemo(() => {
    const {pid} = router.query
    let queryPid = pid || query.pid
    if (Array.isArray(queryPid)) {
      queryPid = queryPid[0]
    }
    return queryPid || ''
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
    dispatch(setCanFetchAttributeStream(true))
  }, [activeGageItem, dispatch])

  const fetchAttributeStream = useCallback(async () => {
    if (
      activeGageItem &&
      streamSetItems.length > 0 &&
      canFetchAttributeStream
    ) {
      activeGageItem.chartValues.map(async (chartValue) => {
        isDev &&
          console.log(
            `fetchElementAttributeStream() for ${activeGageItem.id} | ${format(
              startDate,
              'Pp'
            )} - ${format(endDate, 'Pp')}`
          )
        const eas = await fetchElementAttributeStream(
          streamSetItems,
          chartValue,
          startDate.toISOString(),
          endDate.toISOString(),
          interval
        )
        console.log(eas)
        // if (be && be.Items) {
        //   dispatch(setStreamSetItems(be.Items))
        // }
      })
    }
  }, [
    activeGageItem,
    streamSetItems,
    canFetchAttributeStream,
    startDate,
    endDate,
    interval
  ])

  useEffect(() => {
    // console.log('effect firing for fetchElementAttributeStream()')
    fetchAttributeStream()
  }, [streamSetItems, fetchAttributeStream])

  useEffect(() => {
    // console.log('effect firing', activeGageItem && activeGageItem.id)
    fetchStreamSet()
  }, [activeGageItem, fetchStreamSet])

  useEffect(() => {
    // console.log('useEffect firing due to pid update.')
    const gci = getGageById(pid)
    dispatch(setCanFetchAttributeStream(false)) // It is important to kick this off prior to setting active gage item.
    setActiveGageItem(gci)
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
        <RowBox>
          <Hidden smDown>
            <Box width={350}>
              <PiNavigationList pid={pid} />
            </Box>
          </Hidden>
          <Box flex="auto">
            <Hidden mdUp>
              <Box m={3}>
                <PiNavigationSelect pid={pid} />
              </Box>
            </Hidden>
            <Type variant="subtitle1">Post: {pid}</Type>
          </Box>
        </RowBox>
      </MainBox>
    </PageLayout>
  )
}
DynamicPiPage.getInitialProps = ({query}: NextPageContext) => {
  isDev && console.log(JSON.stringify(query))
  return {query}
}

export default DynamicPiPage
