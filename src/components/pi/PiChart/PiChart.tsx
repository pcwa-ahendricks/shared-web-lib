// cspell:ignore cldl
import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
  useEffect
} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  useMediaQuery,
  LinearProgress,
  useTheme
} from '@material-ui/core'
// import {blue} from '@material-ui/core/colors'
import {format, differenceInMonths, differenceInDays, parseJSON} from 'date-fns'
import {PiContext, PiMetadata} from '../PiStore'
import {RowBox} from '@components/boxes/FlexBox'
import DlCsvButton from '@components/DlCsvButton/DlCsvButton'
import disclaimer from '../disclaimer'
// [todo] Someday types will become available and we can yarn add -D @types/react-vis
import {
  FlexibleWidthXYPlot as XYPlot,
  LineSeries,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Hint,
  Highlight,
  MarkSeries
} from 'react-vis'
import round from '@lib/round'
import MuiNextLink from '@components/NextLink/NextLink'
import PiChartResetZoom from '../PiChartResetZoom/PiChartResetZoom'
import PiChartDataAttributes from '../PiChartDataAttibutes/PiChartDataAttibutes'
import useFriendlyNameMeta from '../hooks/useFriendlyNameMeta'
import useIsRiverGage from '../hooks/useIsRiverGage'
import useIsReservoirGage from '../hooks/useIsReservoirGage'
import useSWR from 'swr'
import {piApiUrl} from '@pages/recreation/flows/gages/[pid]'
import {stringify} from 'querystringify'
import {PiWebElementAttributeStream} from '@lib/services/pi/pi-web-api-types'
// const isDev = process.env.NODE_ENV === 'development'
// import {curveCardinal} from 'd3-shape'
// import PiChartFilterSlider from '../PiChartFilterSlider/PiChartFilterSlider'

type Props = {
  attribute: string
  webId: string
  startTime: Date
  endTime: Date
  // gageId: string // just used w/ console.log
  streamSetMeta?: PiMetadata[]
}

const calcInterval = (startDate: Date, endDate: Date) => {
  const diffInDays = differenceInDays(endDate, startDate)
  switch (true) {
    // Day
    case diffInDays <= 1:
      return '1m' // 1 minute interval.
    // Week
    case diffInDays <= 7:
      return '15m' // 15 minute interval.
    // Month
    case diffInDays <= 32:
      return '1h' // 1 hour interval.
    // Quarter
    case diffInDays <= 92:
      return '8h' // 8 hour interval.
    // Semi-Annual
    case diffInDays <= 183:
      return '12h' // 12 hour interval.
    default:
      return '1d' // 1 day interval
  }
}

const PiChart = ({
  webId,
  startTime,
  endTime,
  attribute,
  // gageId,
  streamSetMeta
}: Props) => {
  const theme = useTheme<Theme>()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const {state} = useContext(PiContext)
  const {activeGageItem} = state
  const [hintValue, setHintValue] = useState<false | {x: number; y: number}>(
    false
  )
  const friendlyName = useFriendlyNameMeta(streamSetMeta)
  const isRiver = useIsRiverGage()
  const isReservoir = useIsReservoirGage()
  const xyPlotRef = useRef<any>()
  const [lastDrawLocation, setLastDrawLocation] = useState<null | {
    // bottom: number
    // top: number
    left: Date
    right: Date
  }>(null)

  const interval = calcInterval(startTime, endTime)

  const qs = stringify(
    {startTime: startTime.toJSON(), endTime: endTime.toJSON(), interval},
    true
  )
  const url = `${piApiUrl}/streams/${webId}/interpolated${qs}`

  const {data, isValidating} = useSWR<PiWebElementAttributeStream>(
    webId ? url : null
  )

  // isDev &&
  //   console.log(
  //     `Chart data for ${gageId}, ${attribute} | ${format(
  //       startTime,
  //       'Pp'
  //     )} - ${format(endTime, 'Pp')} | ${interval}`
  //   )

  // Reset zoom when data changes.
  useEffect(() => {
    setLastDrawLocation(null)
  }, [data])

  const attributeLabel = useMemo(() => {
    if (!attribute) {
      return ''
    }
    return attribute.match(/height/i) ? 'Stage' : attribute
  }, [attribute])

  const seriesTitle = useMemo(
    () =>
      data && data.UnitsAbbreviation
        ? `${attributeLabel} (${data.UnitsAbbreviation.toUpperCase()})`
        : '',
    [data, attributeLabel]
  )

  const chartTitle = useMemo(() => {
    if (!data || !streamSetMeta || !activeGageItem) {
      return ' '
    }
    const firstPart = isReservoir
      ? `${friendlyName}`
      : isRiver
      ? `Gaging Station ${activeGageItem.id.toUpperCase()}`
      : ''

    const secondPart = data.UnitsAbbreviation
      ? ` - ${attributeLabel} in ${data.UnitsAbbreviation}`
      : ''
    return `${firstPart}${secondPart}`
  }, [
    activeGageItem,
    friendlyName,
    data,
    streamSetMeta,
    attributeLabel,
    isRiver,
    isReservoir
  ])

  // Since we are not using an initial value it's mandatory that we don't reduce empty arrays or else we will get a runtime error.
  const maxValue = useMemo(
    () =>
      data && Array.isArray(data.Items)
        ? data.Items.reduce((p, c) => {
            const q = p ?? c
            return c.Value > q.Value ? c : q
          })
        : null,
    [data]
  )

  const minValue = useMemo(
    () =>
      data && Array.isArray(data.Items)
        ? data.Items.reduce((p, c) => {
            const q = p ?? c
            return c.Value < q.Value ? c : q
          })
        : null,
    [data]
  )

  const buttonCaption = useMemo(
    () =>
      `Download ${
        activeGageItem ? activeGageItem.id : ''
      } ${attributeLabel} CSV`,
    [activeGageItem, attributeLabel]
  )

  const csvFileName = useMemo(
    () => `${activeGageItem ? activeGageItem.id : ''}-${attributeLabel}.csv`,
    [activeGageItem, attributeLabel]
  )

  const csvData = useMemo(
    () =>
      data && Array.isArray(data.Items)
        ? data.Items.map((item) => ({
            Timestamp: format(parseJSON(item.Timestamp), 'M/dd/yyyy h:mm aa'),
            Value: item.Value
          }))
        : [],
    [data]
  )

  const csvHeader = useMemo(
    () => `"DISCLAIMER - ${disclaimer.p1}\n${disclaimer.p2}"`,
    []
  )

  const seriesData = useMemo(
    () =>
      data && Array.isArray(data.Items)
        ? data.Items.map((item) => ({
            x: parseJSON(item.Timestamp).getTime(),
            y: item.Value
          }))
        : [],
    [data]
  )

  // It appears that the YAxis labels don't automatically adjust and accommodate width when larger values are present (ie. Reservoir storage/elevation).
  const leftMargin = useMemo(() => {
    if (!maxValue || !maxValue.Value) {
      return 40
    }
    const len = maxValue.Value.toString().length
    switch (true) {
      case len >= 6:
        return 70
      case len === 5:
        return 60
      case len === 4:
        return 50
      default:
        return 40
    }
  }, [maxValue])

  // const strokeWidth = useMemo(() => {
  //   if (!lastDrawLocation) {
  //     return 1.9
  //   }
  //   console.log(lastDrawLocation)
  //   // const diff = lastDrawLocation.right - lastDrawLocation.left
  //   const diff = 300000001

  //   switch (true) {
  //     case diff < 100000000:
  //       return 3.0
  //     case diff < 200000000:
  //       return 2.5
  //     case diff < 300000000:
  //       return 2.0
  //     default:
  //       return 1.9
  //   }
  // }, [lastDrawLocation])

  const onBrushEndHandler = useCallback((area: {left: Date; right: Date}) => {
    // If use just clicked the graph prevent any errors.
    if (!area) {
      return
    }
    setLastDrawLocation(area)
  }, [])

  // const onDragHighlightHandler = useCallback((area: any) => {
  //   console.log('area ondrag', area)
  //   setLastDrawLocation((cldl) => ({
  //     bottom: cldl ? cldl.bottom : 0 + (area.top - area.bottom),
  //     left: cldl ? cldl.left : 0 - (area.right - area.left),
  //     right: cldl ? cldl.right : 0 - (area.right - area.left),
  //     top: cldl ? cldl.top : 0 + (area.top - area.bottom)
  //   }))
  // }, [])

  const hintValEl = useMemo(
    () =>
      hintValue ? (
        <Hint value={hintValue}>
          <Box bgcolor={theme.palette.common.white} boxShadow={3} p={1}>
            <Type
              variant="body2"
              color="textPrimary"
              style={{fontSize: '0.9rem'}}
            >
              {format(new Date(hintValue.x), "EE',' M/dd/yy h':'mm aa")}
            </Type>
            <Type variant="body2" color="textPrimary">
              {seriesTitle}:{' '}
              <strong>{round(hintValue.y, 2).toLocaleString()}</strong>
            </Type>
          </Box>
        </Hint>
      ) : null,
    [hintValue, seriesTitle, theme]
  )

  const markSeriesEl = useMemo(
    () => (
      <MarkSeries
        color={theme.palette.secondary.light}
        data={hintValue ? [{...hintValue}] : []}
      />
    ),
    [hintValue, theme]
  )

  const resetZoomClickHandler = useCallback(() => setLastDrawLocation(null), [])

  const onNearestXHandler = useCallback(
    (value: {x: number; y: number}) => setHintValue(value),
    []
  )

  const tickFormat = useCallback(
    (d: number) => {
      const diffInDays = !lastDrawLocation
        ? differenceInDays(endTime, startTime)
        : differenceInDays(lastDrawLocation.right, lastDrawLocation.left)
      if (diffInDays <= 4) {
        return format(new Date(d), "M'/'dd, h aa")
      }
      const diffInMonths = !lastDrawLocation
        ? differenceInMonths(endTime, startTime)
        : differenceInMonths(lastDrawLocation.right, lastDrawLocation.left)
      if (diffInMonths > 6) {
        return format(new Date(d), "MMM ''yy") // Formatting w/ single-quotes is not intuitive. See https://date-fns.org/v2.4.1/docs/format#description for more info.
      }
      return format(new Date(d), "d'.' MMM")
    },
    [startTime, endTime, lastDrawLocation]
  )

  const tickTotal = useMemo(() => {
    const diffInDays = !lastDrawLocation
      ? differenceInDays(endTime, startTime)
      : differenceInDays(lastDrawLocation.right, lastDrawLocation.left)
    if (diffInDays <= 4) {
      return isMdUp ? 8 : 6
    }
    return isMdUp ? 12 : 8
  }, [isMdUp, lastDrawLocation, endTime, startTime])

  const onMouseLeaveHandler = useCallback(() => {
    setHintValue(false)
  }, [])

  const linearProgressEl = useMemo(
    () =>
      isValidating ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isValidating]
  )

  // const configuredCurve = curveCardinal.tension(0.5)
  const configuredCurve = 'curveMonotoneX'

  return (
    <Box
      boxShadow={2}
      bgcolor={theme.palette.common.white}
      m={3}
      p={3}
      position="relative"
    >
      {linearProgressEl}
      <Type variant="h3" gutterBottom>
        {chartTitle}
      </Type>
      <PiChartDataAttributes
        items={data?.Items}
        minValue={minValue}
        maxValue={maxValue}
        interval={interval}
        isLoading={isValidating}
        streamSetMeta={streamSetMeta}
      />
      <Box position="relative" width="100%">
        {/* <Box
          display={!xyPlotRef.current ? 'none' : 'block'}
          position="absolute"
          top={0}
          right={0}
          zIndex={1}
          width={sliderWidth ? sliderWidth - 42.4 : 0}
        >
          <PiChartFilterSlider />
        </Box> */}

        <PiChartResetZoom
          chartIsZoomed={Boolean(lastDrawLocation)}
          onResetClick={resetZoomClickHandler}
        />
        <XYPlot
          ref={xyPlotRef}
          animation
          xType="time"
          height={300}
          onMouseLeave={onMouseLeaveHandler}
          xDomain={
            lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]
          }
          // yDomain={
          //   lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]
          // }
          yPadding={10}
          margin={{right: 20, top: 20, left: leftMargin}}
        >
          <HorizontalGridLines />
          <XAxis tickFormat={tickFormat} tickTotal={tickTotal} />
          <YAxis
            title={seriesTitle}
            style={{fontSize: '1rem'}}
            // orientation="right"
            // position="middle"
          />
          {hintValEl}
          <LineSeries
            color={theme.palette.primary.light}
            opacity={0.95}
            strokeWidth={1.9} // Defaults to 2px.
            curve={configuredCurve}
            data={seriesData}
            onNearestX={onNearestXHandler}
            style={{fill: 'none'}}
          />
          {markSeriesEl}
          <Highlight
            // drag
            enableY={false}
            onBrushEnd={onBrushEndHandler}
            // onDrag={onDragHighlightHandler}
            // onDragEnd={onDragHighlightHandler}
          />
        </XYPlot>
      </Box>
      <RowBox justifyContent="flex-end" textAlign="right" fontStyle="italic">
        {isValidating ? null : (
          <Type variant="body2">
            {`Generated on ${format(new Date(), "MMM do',' yyyy',' h:mm aa")}`}
          </Type>
        )}
      </RowBox>
      <RowBox justifyContent="flex-end" textAlign="right">
        {isValidating ? null : (
          <MuiNextLink
            variant="caption"
            color="textSecondary"
            href="/"
            underline="none"
          >
            &copy; PCWA
          </MuiNextLink>
        )}
      </RowBox>
      <DlCsvButton data={csvData} header={csvHeader} fileName={csvFileName}>
        {buttonCaption}
      </DlCsvButton>
    </Box>
  )
}

export default PiChart
