// cspell:ignore cldl
import React, {useState, useContext, useMemo, useCallback, useRef} from 'react'
import {Box, Theme, Typography as Type, useMediaQuery} from '@material-ui/core'
// import {blue} from '@material-ui/core/colors'
// import {useTheme, makeStyles, createStyles} from '@material-ui/styles'
import {useTheme} from '@material-ui/styles'
import {format, formatDistance, parseISO, differenceInMonths} from 'date-fns'
import {AttributeStream, PiContext} from '../PiStore'
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
import 'react-vis/dist/style.css'
import round from '@lib/round'
import MuiNextLink from '@components/NextLink/NextLink'
import PiChartResetZoom from '../PiChartResetZoom/PiChartResetZoom'
// import PiChartFilterSlider from '../PiChartFilterSlider/PiChartFilterSlider'

type Props = {
  data?: AttributeStream
}

const PiChart = ({data}: Props) => {
  const theme = useTheme<Theme>()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const {state} = useContext(PiContext)
  const [hintValue, setHintValue] = useState<false | {x: number; y: number}>(
    false
  )
  const xyPlotRef = useRef<any>()
  const [lastDrawLocation, setLastDrawLocation] = useState<null | {
    bottom: number
    top: number
    left: number
    right: number
  }>(null)
  const {streamSetMeta, activeGageItem, startDate, endDate, interval} = state

  const isReservoir = useMemo(
    () =>
      activeGageItem &&
      activeGageItem.baseElement === '\\\\BUSINESSPI2\\OPS\\Reservoirs',
    [activeGageItem]
  )

  const isRiver = useMemo(
    () =>
      activeGageItem &&
      activeGageItem.baseElement === '\\\\BUSINESSPI2\\OPS\\Gauging Stations',
    [activeGageItem]
  )

  const attributeLabel = useMemo(() => {
    if (!data) {
      return ''
    }
    return data.attribute.match(/height/i) ? 'Stage' : data.attribute
  }, [data])

  const seriesTitle = useMemo(
    () =>
      data && data.units
        ? `${attributeLabel} (${data.units.toUpperCase()})`
        : '',
    [data, attributeLabel]
  )

  const friendlyName = useMemo(() => {
    const f = streamSetMeta.find(
      (m) => m.name && m.name && m.name.match(/friendly\s?name/i)
    )
    return (f && f.value) || ''
  }, [streamSetMeta])

  const chartTitleEl = useMemo(() => {
    if (!data || !streamSetMeta || !activeGageItem) {
      return ' '
    }
    return isReservoir
      ? `${friendlyName} -
              ${data.attribute} in ${data.units}`
      : isRiver
      ? `Gaging Station ${activeGageItem.id.toUpperCase()} -
      ${attributeLabel} in ${data.units}`
      : ' '
  }, [
    activeGageItem,
    friendlyName,
    data,
    streamSetMeta,
    attributeLabel,
    isRiver,
    isReservoir
  ])

  const gagingStationCaption = useMemo(() => {
    if (!activeGageItem) {
      return ''
    }
    return isReservoir
      ? friendlyName
      : `${activeGageItem.id.toUpperCase()} - ${friendlyName}`
  }, [activeGageItem, friendlyName, isReservoir])

  //  ex.) Fri 9/20/2019 1:00 PM through Fri 9/27/2019 2:00 PM (7 days)
  const dateRangeCaption = useMemo(
    () =>
      `${format(startDate, 'EE M/dd/yyyy h:mm bb')} through ${format(
        endDate,
        'EE M/dd/yyyy h:mm bb'
      )} (${formatDistance(startDate, endDate)})`,

    [startDate, endDate]
  )

  const maxValue = useMemo(
    () =>
      data &&
      data.items.reduce((p, c) => {
        const q = p || c
        return c.Value > q.Value ? c : q
      }),
    [data]
  )

  const minValue = useMemo(
    () =>
      data &&
      data.items.reduce((p, c) => {
        const q = p || c
        return c.Value < q.Value ? c : q
      }),
    [data]
  )

  // ex.) 1.80 CFS on Fri 9/20/2019 1:00 PM
  const maxValueCaption = useMemo(() => {
    if (!maxValue || !maxValue.Value) {
      return ''
    }
    const timestamp = new Date(maxValue.Timestamp)
    return `${maxValue.Value.toLocaleString()} ${
      maxValue.UnitsAbbreviation
    } on ${format(timestamp, 'EE M/dd/yyyy h:mm bb')}`
  }, [maxValue])

  const minValueCaption = useMemo(() => {
    if (!minValue || !minValue.Value) {
      return ''
    }
    const timestamp = new Date(minValue.Timestamp)
    return `${minValue.Value.toLocaleString()} ${
      minValue.UnitsAbbreviation
    } on ${format(timestamp, 'EE M/dd/yyyy h:mm bb')}`
  }, [minValue])

  // ex.) 677 data points returned in 15 minute intervals.
  const dataPointsCaption = useMemo(() => {
    let intervalCaption = ''
    switch (true) {
      // Minute
      case /\d+m/i.test(interval):
        intervalCaption = interval.replace(/(\d)(m)/i, '$1 minute')
        break
      // Hour
      case /\d+h/i.test(interval):
        intervalCaption = interval.replace(/(\d)(h)/i, '$1 hour')
        break
      // Day
      case /\d+d/i.test(interval):
        intervalCaption = interval.replace(/(\d)(d)/i, '$1 day')
        break
    }
    return data && intervalCaption
      ? `${data.items.length} data points returned in ${intervalCaption} intervals.`
      : ''
  }, [data, interval])

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
      data &&
      data.items.map((item) => ({
        Timestamp: format(parseISO(item.Timestamp), 'M/dd/yyyy h:mm aa'),
        Value: item.Value
      })),
    [data]
  )

  const csvHeader = useMemo(
    () => `"DISCLAIMER - ${disclaimer.p1}\n${disclaimer.p2}"`,
    []
  )

  const seriesData = useMemo(
    () =>
      data
        ? data.items.map((item) => ({
            x: parseISO(item.Timestamp).getTime(),
            y: item.Value
          }))
        : [],
    [data]
  )

  const strokeWidth = useMemo(() => {
    if (!lastDrawLocation) {
      return 1.9
    }
    const diff = lastDrawLocation.right - lastDrawLocation.left

    switch (true) {
      case diff < 100000000:
        return 3.0
      case diff < 200000000:
        return 2.5
      case diff < 300000000:
        return 2.0
      default:
        return 1.9
    }
  }, [lastDrawLocation])

  const onBrushEndHandler = useCallback((area: any) => {
    setLastDrawLocation(area)
  }, [])

  const onDragHighlightHandler = useCallback((area: any) => {
    setLastDrawLocation((cldl) => ({
      bottom: cldl ? cldl.bottom : 0 + (area.top - area.bottom),
      left: cldl ? cldl.left : 0 - (area.right - area.left),
      right: cldl ? cldl.right : 0 - (area.right - area.left),
      top: cldl ? cldl.top : 0 + (area.top - area.bottom)
    }))
  }, [])

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
    () =>
      hintValue ? (
        <MarkSeries
          color={theme.palette.secondary.light}
          data={[{...hintValue}]}
          // className="mark-series-example"
          // sizeRange={[5, 15]}
        />
      ) : null,
    [hintValue, theme]
  )

  const resetZoomClickHandler = useCallback(() => setLastDrawLocation(null), [])

  const onNearestXHandler = useCallback(
    (value: {x: number; y: number}) => setHintValue(value),
    []
  )

  const DataType = ({children, ...rest}: any) => (
    <Type variant="subtitle2" {...rest}>
      {children}
    </Type>
  )

  const tickFormat = useCallback(
    (d: number) => {
      const diffInMonths = differenceInMonths(endDate, startDate)
      if (diffInMonths > 6) {
        return format(new Date(d), "MMM ''yy") // Formatting w/ single-quotes is not intuitive. See https://date-fns.org/v2.4.1/docs/format#description for more info.
      }
      return format(new Date(d), "d'.' MMM")
    },
    [startDate, endDate]
  )

  const tickTotal = useMemo(() => (isMdUp ? 12 : 8), [isMdUp])

  const onMouseLeaveHandler = useCallback(() => {
    setHintValue(false)
  }, [])

  return (
    <Box boxShadow={2} bgcolor={theme.palette.common.white} m={3} p={3}>
      <Type variant="h3" gutterBottom>
        {chartTitleEl}
      </Type>
      <RowBox>
        <Box flex="20%">
          <DataType>Gaging Station:</DataType>
          <DataType>Date Range:</DataType>
          <DataType>Largest Value:</DataType>
          <DataType>Smallest Value:</DataType>
          <DataType>Data Points:</DataType>
        </Box>
        <Box flex="80%">
          <DataType>{gagingStationCaption}</DataType>
          <DataType>{dateRangeCaption}</DataType>
          <DataType>{maxValueCaption}</DataType>
          <DataType>{minValueCaption}</DataType>
          <DataType>{dataPointsCaption}</DataType>
        </Box>
      </RowBox>

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
          yDomain={
            lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]
          }
          yPadding={10}
          margin={{right: 10, top: 20}}
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
            strokeWidth={strokeWidth} // Defaults to 2px.
            curve={'curveMonotoneX'}
            data={seriesData}
            onNearestX={onNearestXHandler}
          />
          {markSeriesEl}
          <Highlight
            onBrushEnd={onBrushEndHandler}
            onDrag={onDragHighlightHandler}
          />
        </XYPlot>
      </Box>
      <RowBox justifyContent="flex-end" textAlign="right" fontStyle="italic">
        <Type variant="body2">
          {`Generated on ${format(new Date(), "MMM do',' yyyy',' h:mm aa")}`}
        </Type>
      </RowBox>
      <RowBox justifyContent="flex-end" textAlign="right">
        <MuiNextLink
          variant="caption"
          color="textSecondary"
          href="/"
          underline="none"
        >
          &copy; PCWA
        </MuiNextLink>
      </RowBox>
      <DlCsvButton
        color="secondary"
        data={csvData}
        header={csvHeader}
        fileName={csvFileName}
      >
        {buttonCaption}
      </DlCsvButton>
    </Box>
  )
}

export default PiChart
