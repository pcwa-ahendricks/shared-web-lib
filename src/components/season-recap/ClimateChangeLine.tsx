// cspell:ignore accum rnge nrml clim arry
import {lightBlue, orange} from '@material-ui/core/colors'
import {ResponsiveLine, Serie} from '@nivo/line'
import React, {useMemo} from 'react'
import {ClimChgResponse} from '@components/season-recap/RegionalSection'
import {parse, format} from 'date-fns'
import {
  Box,
  useTheme,
  Typography as Type,
  useMediaQuery
} from '@material-ui/core'
import SquareIcon from 'mdi-material-ui/Square'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import round from '@lib/round'
import createTrend from 'trendline'

type Props = {
  tempDataset?: ClimChgResponse
}

export default function ClimateChangeLine({tempDataset}: Props) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const lineData = useMemo(
    () =>
      Object.keys(tempDataset?.data ?? []).map((key) => {
        const arry = tempDataset?.data
        const y = parseFloat(arry?.[key].value ?? '')
        const yearStr = key.substr(0, 4)
        const x = format(parse(yearStr, 'yyyy', new Date()), 'yyyy')
        return {
          x,
          y
        }
      }),
    [tempDataset]
  )

  const yData = lineData.map((d) => d.y)
  const xData = lineData.map((d) => parseInt(d.x, 10))
  const maxY = Math.max(...yData)
  const minY = Math.min(...yData)

  const maxX = Math.max(...xData)
  const minX = Math.min(...xData)

  const trendSerie: Serie = useMemo(() => {
    const trend = createTrend(
      lineData.map(({x, y}) => ({y, x: parseInt(x, 10)})),
      'x',
      'y'
    )

    return {
      id: 'Trend',
      data: [
        {y: trend.calcY(minX), x: minX},
        {y: trend.calcY(maxX), x: maxX}
      ].filter((d) => d.y !== null && Number.isFinite(d.x))
    }
  }, [lineData, minX, maxX])

  // Add a 4% margin to the chart on the Y axis for the top and a 6% margin on the bottom
  const scaleMinMax = useMemo(() => {
    if (!maxY) {
      return null
    }
    const highBuffer = maxY * 0.04

    if (!minY) {
      return null
    }
    const lowBuffer = minY * 0.06
    return {
      low: round(minY - lowBuffer, 0),
      high: round(maxY + highBuffer, 0)
    }
  }, [maxY, minY])

  // .reduce((p, c) => ({
  //   id: 'Temperature',
  //   data: [...p.data, c]
  // }))
  const dataSerie: Serie = useMemo(
    () => ({
      id: 'Avg. Temperature',
      data: lineData.filter(Boolean)
    }),
    [lineData]
  )

  return (
    <ResponsiveLine
      data={[trendSerie, dataSerie]}
      // colors={{scheme: 'red_yellow_green'}}
      colors={[lightBlue[200], orange[700]]}
      margin={{top: 12, right: 50, bottom: 60, left: 50}}
      xScale={{
        type: 'time',
        format: '%Y',
        useUTC: false,
        precision: 'year'
      }}
      xFormat="time:%Y"
      yScale={{
        type: 'linear',
        max: scaleMinMax?.high ?? 'auto',
        min: scaleMinMax?.low ?? 'auto',
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.1f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%Y',
        tickValues: 'every 10 year',
        legend: 'Year',
        tickRotation: 45,
        legendOffset: -14
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Temperature (°F)',
        legendOffset: -40,
        legendPosition: 'middle'
      }}
      enablePoints={false}
      // pointSize={10}
      pointColor={{theme: 'background'}}
      pointBorderWidth={2}
      pointBorderColor={{from: 'serieColor'}}
      pointLabelYOffset={-12}
      crosshairType="x"
      useMesh={true}
      lineWidth={isMdUp ? 1.8 : 1.3}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'lines',
        'points',
        'slices',
        'mesh',
        'legends'
      ]}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 60,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 130,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      // enableSlices="x"
      tooltip={({point}) => {
        const {serieColor: color, data, serieId} = point
        const {y, yFormatted, xFormatted} = data
        if (y === undefined || /trend/i.test(serieId.toString().toLowerCase()))
          return null
        return (
          <Box
            bgcolor={theme.palette.common.white}
            px={1}
            py={0.5}
            boxShadow={4}
            borderRadius={3}
          >
            <RowBox alignItems="center">
              <ColumnBox justifyContent="center" pr={0.5}>
                <SquareIcon fontSize="small" style={{color}} />
              </ColumnBox>
              <ChildBox style={{paddingRight: 6}}>
                <Type variant="caption">
                  <Type variant="inherit">{xFormatted}</Type>:
                </Type>
              </ChildBox>
              <ChildBox>
                <Type variant="caption">
                  <strong>{yFormatted}&deg;</strong>
                </Type>
              </ChildBox>
            </RowBox>
          </Box>
        )
      }}
    />
  )
}
