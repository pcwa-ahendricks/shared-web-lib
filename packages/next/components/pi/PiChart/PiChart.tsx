// cspell:ignore highcharts highstock
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react'
import {Box, Typography as Type} from '@material-ui/core'
// import {useTheme, makeStyles, createStyles} from '@material-ui/styles'
// import {useTheme} from '@material-ui/styles'
import Highcharts, {Options} from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import {format, formatDistance} from 'date-fns'
import {AttributeStream, PiContext} from '../PiStore'
import delay from 'then-sleep'
import {RowBox} from '@components/boxes/FlexBox'

const RESET_CHART_WIDTH = 200 // This is essentially the smallest width in px the chart may become.

type Props = {
  windowWidth?: number
  data?: AttributeStream
}

// const useStyles = makeStyles(() =>
//   createStyles({
//     wrapper: {
//       maxWidth: 900
//     }
//   })
// )

const PiChart = ({data, windowWidth}: Props) => {
  // const theme = useTheme<Theme>()
  const chartParentRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HighchartsReact>(null)
  const windowWidthRef = useRef<number>()
  const {state} = useContext(PiContext)
  const {streamSetMeta, activeGageItem, startDate, endDate} = state
  const [chartOptions, setChartOptions] = useState<Options>({
    title: {
      text: ''
    },
    chart: {
      spacingBottom: 50 // So we can see footer.
      // width: 0
    },
    credits: {
      text: '\u00A9 PCWA',
      href: 'https://www.pcwa.net'
    },
    lang: {
      thousandsSep: ','
    },
    time: {
      useUTC: false
    },
    subtitle: {
      text: `Generated on ${format(new Date(), 'PPpp')}`,
      align: 'right',
      y: 30,
      verticalAlign: 'bottom',
      floating: true
    },
    tooltip: {
      valueDecimals: 2
    },
    // For use with Highstock.
    rangeSelector: {
      enabled: false
    },
    exporting: {enabled: false}, // Hide hamburger menu.
    xAxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    series: [
      {
        type: 'line',
        data: [
          29.9,
          71.5,
          106.4,
          129.2,
          144.0,
          176.0,
          135.6,
          148.5,
          216.4,
          194.1,
          295.6,
          454.4
        ]
      }
    ]
  })

  const reflowChart = useCallback(() => {
    if (
      chartRef.current &&
      chartRef.current.chart &&
      chartRef.current.chart.reflow
    ) {
      chartRef.current.chart.reflow()
    }
  }, [])

  const setChartWidth = useCallback((width: number) => {
    setChartOptions((currentChartOptions) => ({
      ...currentChartOptions,
      chart: {
        ...currentChartOptions.chart,
        width
      }
    }))
  }, [])

  const setChartWidthToParent = useCallback(() => {
    const parentWidth = chartParentRef.current
      ? chartParentRef.current.offsetWidth
      : RESET_CHART_WIDTH
    setChartWidth(parentWidth)
  }, [setChartWidth])

  // Only need to reset chart width when the window width decreased. Note, since windowWidthRef will initially be undefined it will take 2+ window increase resizes to see how this affects the reflow.
  useEffect(() => {
    if (
      windowWidth &&
      windowWidthRef.current &&
      windowWidthRef.current < windowWidth
    ) {
      setChartWidthToParent()
    } else {
      setChartWidth(RESET_CHART_WIDTH)
    }
    windowWidthRef.current = windowWidth
  }, [windowWidth, setChartWidthToParent, setChartWidth])

  useEffect(() => {
    const asyncFn = async () => {
      // 1. Always reflow chart, regardless of if block.
      // 2. Need to reflow before setting chart width to parent so that parent can actually shrink first, hence reflow call before the if block rather than after.
      // 3. [hack] Delay a bit so that all Highcharts (usually 2) have enough time to shrink. 300ms seems to work well; 200ms didn't.
      reflowChart()
      await delay(300)
      if (
        chartOptions.chart &&
        chartOptions.chart.width === RESET_CHART_WIDTH
      ) {
        setChartWidthToParent()
      }
    }
    asyncFn()
  }, [reflowChart, chartOptions, setChartWidthToParent])

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
    return activeGageItem.type === 'reservoir'
      ? `${friendlyName} -
              ${data.attribute} in ${data.units}`
      : activeGageItem.type === 'river'
      ? `Gaging Station ${activeGageItem.id.toUpperCase()} -
      ${data.attribute.match(/height/i) ? 'Stage' : data.attribute} in ${
          data.units
        }`
      : ' '
  }, [activeGageItem, friendlyName, data, streamSetMeta])

  const gagingStationCaption = useMemo(
    () =>
      activeGageItem
        ? `${activeGageItem.id.toUpperCase()} - ${friendlyName}`
        : '',
    [activeGageItem, friendlyName]
  )

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

  return (
    <React.Fragment>
      <Type variant="h3" gutterBottom>
        {chartTitleEl}
      </Type>
      <RowBox>
        <Box flex="20%">
          <Type variant="subtitle2">Gaging Station:</Type>
          <Type variant="subtitle2">Date Range:</Type>
          <Type variant="subtitle2">Largest Value:</Type>
          <Type variant="subtitle2">Smallest Value:</Type>
        </Box>
        <Box flex="80%">
          <Type variant="subtitle2">{gagingStationCaption}</Type>
          <Type variant="subtitle2">{dateRangeCaption}</Type>
          <Type variant="subtitle2">{maxValueCaption}</Type>
          <Type variant="subtitle2">{minValueCaption}</Type>
        </Box>
      </RowBox>
      <div ref={chartParentRef}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={'stockChart'}
          ref={chartRef}
        />
      </div>
    </React.Fragment>
  )
}

export default PiChart
