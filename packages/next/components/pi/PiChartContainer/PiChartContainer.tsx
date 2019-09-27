// cspell:ignore highcharts highstock
import React, {useState, useRef, useEffect, useCallback} from 'react'
import {Box, Theme} from '@material-ui/core'
// import {BoxProps} from '@material-ui/core/Box'
// import {useTheme, makeStyles, createStyles} from '@material-ui/styles'
import {useTheme} from '@material-ui/styles'
import Highcharts, {Options} from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
// import {Options} from 'highcharts/highstock'
// import {Options} from 'highcharts'
import {format} from 'date-fns'
import useWindowResize from '@hooks/useWindowResize'

// See https://www.npmjs.com/package/highcharts-react-official#highcharts-with-nextjs for more info regarding this if block.
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

const RESET_CHART_WIDTH = 200 // This is essentially the smallest width in px the chart may become.

// const useStyles = makeStyles(() =>
//   createStyles({
//     wrapper: {
//       maxWidth: 900
//     }
//   })
// )

const PiChartContainer = () => {
  const theme = useTheme<Theme>()
  const chartParentRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<HighchartsReact>(null)
  // const classes = useStyles()
  const [windowWidth, setWindowWidth] = useState<number>()
  const windowWidthRef = useRef<number>()
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

  useWindowResize(() => {
    if (window && window.innerWidth) {
      setWindowWidth(window.innerWidth)
    }
  }, 80)

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
    // 1. Always reflow chart, regardless of if block.
    // 2. Need to reflow before setting chart width to parent so that parent can actually shrink first, hence reflow call before the if block rather than after.
    reflowChart()
    if (chartOptions.chart && chartOptions.chart.width === RESET_CHART_WIDTH) {
      setChartWidthToParent()
    }
  }, [reflowChart, chartOptions, setChartWidthToParent])

  return (
    <Box boxShadow={2} bgcolor={theme.palette.common.white} m={3} p={3}>
      <div ref={chartParentRef}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={'stockChart'}
          ref={chartRef}
        />
      </div>
    </Box>
  )
}

export default PiChartContainer
