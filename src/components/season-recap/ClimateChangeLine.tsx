// cspell:ignore accum rnge nrml clim arry
import {orange} from '@material-ui/core/colors'
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

  // Add a 4% margin to the chart on the Y axis for the top and a 6% margin on the bottom
  const scaleMinMax = useMemo(() => {
    const highestVal = lineData
      // .reduce<Datum[]>((prev, curr) => [...prev, ...curr.data], [])
      .reduce<number | null>((prev, curr) => {
        const currVal = curr?.y ?? 0
        if (typeof currVal !== 'number') {
          return prev || null
        }
        if (!prev) {
          return currVal
        }
        return prev > currVal ? prev : currVal
      }, null)
    if (!highestVal) {
      return null
    }
    const highBuffer = highestVal * 0.04

    const lowestVal = lineData
      // .reduce<Datum[]>((prev, curr) => [...prev, ...curr.y], [])
      .reduce<number | null>((prev, curr) => {
        const currVal = curr?.y ?? 0
        if (typeof currVal !== 'number') {
          return prev || null
        }
        if (!prev) {
          return currVal
        }
        return prev < currVal ? prev : currVal
      }, null)
    if (!lowestVal) {
      return null
    }
    const lowBuffer = lowestVal * 0.06
    return {
      low: round(lowestVal - lowBuffer, 0),
      high: round(highestVal + highBuffer, 0)
    }
  }, [lineData])

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
      data={[dataSerie]}
      // colors={{scheme: 'red_yellow_green'}}
      colors={[orange[700]]}
      margin={{top: 20, right: 30, bottom: 70, left: 60}}
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
      enablePoints={true}
      pointSize={4.5}
      // pointColor={{theme: 'background'}}
      pointColor={orange[700]}
      pointBorderWidth={2}
      // pointBorderColor={{from: 'serieColor'}}
      pointBorderColor={{from: 'backgroundColor'}}
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
          symbolShape: 'square',
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
        const {serieColor: color, data} = point
        const {y, yFormatted, xFormatted} = data

        if (y === undefined) return null
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
