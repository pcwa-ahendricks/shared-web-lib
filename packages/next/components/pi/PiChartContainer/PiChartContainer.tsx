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
  const [chartOptions, setChartOptions] = useState<Options>({
    title: {
      text: ''
    },
    // chart: {
    //   width: 0
    // },
    credits: {
      text: '\u00A9 PCWA',
      href: 'https://www.pcwa.net'
    },
    subtitle: {
      text: `Generated on ${format(new Date(), 'LLLL')}`,
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

  useWindowResize(() => {
    setChartWidth(RESET_CHART_WIDTH)
  }, 80)

  useEffect(() => {
    // 1. Always reflow chart, regardless of if block.
    // 2. Need to reflow before setting chart width to parent so that parent can actually shrink first, hence reflow call before the if block rather than after.
    reflowChart()
    if (chartOptions.chart && chartOptions.chart.width === RESET_CHART_WIDTH) {
      const parentWidth = chartParentRef.current
        ? chartParentRef.current.offsetWidth
        : RESET_CHART_WIDTH
      setChartWidth(parentWidth)
    }
  }, [reflowChart, chartOptions, setChartWidth])

  return (
    <Box boxShadow={2} bgcolor={theme.palette.common.white} m={3} p={3}>
      <div ref={chartParentRef}>
        {/* <Box maxWidth={800}> */}
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          constructorType={'stockChart'}
          ref={chartRef}
        />
      </div>
      {/* </Box> */}
    </Box>
  )
}

export default PiChartContainer
