// cspell:ignore accum rnge nrml clim arry
import {grey, lightBlue, orange} from '@mui/material/colors'
import {ComputedSerie, CustomLayer, ResponsiveLine, Serie} from '@nivo/line'
import React, {useMemo} from 'react'
import {Box, useTheme, Typography as Type, useMediaQuery} from '@mui/material'
import SquareIcon from 'mdi-material-ui/Square'
import {ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import round from '@lib/round'
import createTrend from 'trendline'
import isNumber from 'is-number'

type Props = {
  climChgChartData?: {x: number; y: number}[]
}

export default function ClimateChangeLine({
  climChgChartData: chartData = []
}: Props) {
  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  const yData = chartData.map(({y}) => y)
  const xData = chartData.map(({x}) => x)
  const maxY = Math.max(...yData)
  const minY = Math.min(...yData)

  const maxX = Math.max(...xData)
  const minX = Math.min(...xData)
  const xScaleMax = isNumber(maxX) ? (maxX + 5).toString() : 'auto'

  const baselineSerie: Serie = useMemo(() => {
    return {
      id: 'Baseline',
      data: chartData
        .map(({x}) => {
          return {
            y: yData.reduce((a, b) => a + b) / yData.length,
            x
          }
        })
        .filter(({x, y}) => y !== null && isNumber(x))
    }
  }, [chartData, yData])

  const trendSerie: Serie = useMemo(() => {
    const trend = createTrend(chartData, 'x', 'y')

    return {
      id: 'Trend',
      data: [
        {y: trend.calcY(minX), x: minX},
        {y: trend.calcY(maxX), x: maxX}
      ].filter(({x, y}) => y !== null && isNumber(x))
    }
  }, [chartData, minX, maxX])

  // Add a 4% margin to the chart on the Y axis for the top and a 6% margin on the bottom
  const scaleMaxY = round(maxY + maxY * 0.04, 0)
  const scaleMinY = round(minY - minY * 0.06, 0)
  const tickValues = useMemo(
    () =>
      [...Array(100).keys()].filter(
        (n) => n <= scaleMaxY && n >= scaleMinY && n % 2 == 0
      ),
    [scaleMinY, scaleMaxY]
  )

  const dataSerie: Serie = useMemo(
    () => ({
      id: 'Avg. Temperature',
      data: chartData.filter(Boolean)
    }),
    [chartData]
  )
  const styleById = useMemo(
    () =>
      ({
        Trend: {
          strokeWidth: 2.3
        },
        Baseline: {
          strokeWidth: 2
        },
        default: {
          strokeWidth: isMdUp ? 1.5 : 1.3
        }
      }) as {[key: string]: React.SVGProps<SVGPathElement>['style']},
    [isMdUp]
  )

  const CustomLines: CustomLayer = useMemo(
    () =>
      ({series, lineGenerator, xScale, yScale}) => {
        return series.map(({id, data, color}) => {
          const idStr = id.toString()
          return (
            <path
              key={id}
              d={
                lineGenerator(
                  data.map(({data}): any => ({
                    ...(data?.x != null &&
                      data?.x != undefined && {x: (xScale as any)(data?.x)}),
                    ...(data?.y != null &&
                      data?.y != undefined && {y: (yScale as any)(data?.y)})
                  }))
                ) as any
              }
              fill="none"
              stroke={color}
              style={styleById[idStr] || styleById.default}
            />
          )
        })
      },
    [styleById]
  )

  return (
    <ResponsiveLine
      data={[dataSerie, baselineSerie, trendSerie]}
      // colors={{scheme: 'red_yellow_green'}}
      colors={[orange[700], grey[600], lightBlue[300]]}
      margin={{top: 20, right: 30, bottom: 70, left: 60}}
      xScale={{
        type: 'time',
        format: '%Y',
        useUTC: false,
        precision: 'year',
        max: xScaleMax
      }}
      xFormat="time:%Y"
      yScale={{
        type: 'linear',
        max: scaleMaxY ?? 'auto',
        min: scaleMinY ?? 'auto',
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
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Temperature (°F)',
        legendOffset: -40,
        legendPosition: 'middle',
        // decrease frequency of labels along Y axis
        tickValues
      }}
      enablePoints={true}
      pointSize={4}
      // pointColor={{theme: 'background'}}
      pointColor={(serie: ComputedSerie) =>
        /trend|baseline/i.test(serie.id.toString())
          ? 'rgb(255,255,255,0.0'
          : orange[700]
      }
      pointBorderWidth={2}
      // Point label doesn't provide a way to easily check if the label belongs to the Avg. Temps or the Trendline
      // enablePointLabel={true}
      // pointLabel={(f) => {
      //   if (maxX.toString() !== f.xFormatted) {
      //     return ''
      //   }
      //   console.log(f)
      //   return maxX.toString() === f.xFormatted ? `label: ${f.yFormatted}` : ''
      // }}
      // pointBorderColor={{from: 'serieColor'}}
      pointBorderColor={{from: 'backgroundColor'}}
      // pointLabelYOffset={-12}
      crosshairType="x"
      useMesh={true}
      // See above
      // lineWidth={isMdUp ? 1.5 : 1.3}
      layers={[
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        'points',
        // See Custom Layer above
        // 'lines',
        CustomLines,
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
        const {serieColor: color, data, serieId} = point
        const {y, yFormatted, xFormatted} = data
        if (
          y === undefined ||
          /trend|baseline/i.test(serieId.toString().toLowerCase())
        )
          return null
        return (
          <Box
            bgcolor={theme.palette.common.white}
            px={1}
            py={0.5}
            boxShadow={4}
            borderRadius="3px"
          >
            <RowBox alignItems="center">
              <ColumnBox justifyContent="center" pr={0.5}>
                <SquareIcon fontSize="small" sx={{color}} />
              </ColumnBox>
              <ChildBox>
                <Type variant="caption" sx={{paddingRight: '6px'}}>
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
