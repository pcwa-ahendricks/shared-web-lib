// cspell:ignore accum
import {brown, green, red, blue} from '@material-ui/core/colors'
import {
  Serie,
  CustomLayer,
  CustomLayerProps,
  ResponsiveLine,
  Point
} from '@nivo/line'
import React, {useCallback} from 'react'
import {Defs} from '@nivo/core'
import {area, curveMonotoneX} from 'd3-shape'
import {Box, useTheme, Typography as Type} from '@material-ui/core'

type Props = {
  tempDataset: Serie[]
}
type PointDataMeta = Point['data'] & {historicalYear?: string}

export default function TempRangeLine({tempDataset}: Props) {
  const theme = useTheme()
  const AreaLayer: CustomLayer = useCallback(
    ({series, xScale, yScale}: CustomLayerProps) => {
      // Using area() is easier with combined series data.
      const y1SeriesData =
        series.find((s) => s.id === 'Normal High Range')?.data ?? []
      const y0SeriesData =
        series.find((s) => s.id === 'Normal Low Range')?.data ?? []

      const seriesData = y1SeriesData.map((i, idx) => ({
        ...i,
        data: {
          x: i.data.x,
          y0: y0SeriesData[idx].data.y,
          y1: i.data.y
        }
      }))

      const areaGenerator = area<typeof seriesData[0]>()
        .x(({data}) => xScale(data.x ? data.x : ''))
        .y0(({data}) => yScale(data.y0 ? data.y0 : ''))
        .y1(({data}) => yScale(data.y1 ? data.y1 : ''))
        .curve(curveMonotoneX)
      const d = areaGenerator(seriesData)
      if (!d) {
        return null
      }
      return (
        <>
          <Defs
            defs={[
              {
                id: 'pattern',
                type: 'patternLines',
                background: 'transparent',
                color: brown[200],
                lineWidth: 1,
                spacing: 5,
                rotation: -45
              }
            ]}
          />
          <path
            d={d}
            fill="url(#pattern)"
            fillOpacity={0.5}
            // stroke={brown[100]}
            // strokeWidth={1}
          />
        </>
      )
    },
    []
  )
  return (
    <ResponsiveLine
      data={tempDataset}
      // colors={{scheme: 'red_yellow_green'}}
      colors={[blue[700], green[100], red[100], brown[100], brown[100]]}
      margin={{top: 50, right: 140, bottom: 50, left: 60}}
      xScale={{
        type: 'time',
        format: '%Y-%m-%d',
        useUTC: false,
        precision: 'day'
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: 'linear',
        min: -10,
        max: 120,
        stacked: false,
        reverse: false
      }}
      yFormat=" >-.0f"
      curve="monotoneX"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%b %d',
        tickValues: 'every 1 month',
        legend: 'Date',
        legendOffset: -12
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
      layers={[
        AreaLayer,
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
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
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
      enableSlices="x"
      sliceTooltip={({slice}) => {
        return (
          <Box
            bgcolor={theme.palette.common.white}
            p={[1, 1.5]}
            style={{
              border: '1px solid #ccc'
            }}
          >
            {/* <div>x: {slice.id}</div> */}
            {slice.points.map((point, idx) => {
              const data: PointDataMeta = point.data
              const historicalHighYear = data.historicalYear?.substring(0, 4)
              const historicalLowYear = data.historicalYear?.substring(0, 4)
              const isHistorical = /historical/i.test(point.serieId.toString())
              const isHistoricalLow = /historical low/i.test(
                point.serieId.toString()
              )
              const isHistoricalHigh = /historical high/i.test(
                point.serieId.toString()
              )
              const historicalYear = isHistoricalHigh
                ? historicalHighYear
                : isHistoricalLow
                ? historicalLowYear
                : ''
              // if (isHistoricalHigh) {
              //   console.log('slice', slice)
              //   console.log('point', point)
              //   console.log('idx', idx)
              // }
              return (
                <Box key={point.id}>
                  {idx === 0 ? (
                    <Type variant="caption">
                      <strong>{point.data.xFormatted}</strong>
                    </Type>
                  ) : null}
                  <Box
                    px={1}
                    style={{
                      color: point.serieColor
                    }}
                  >
                    <Type variant="caption">
                      <strong>{point.serieId}</strong> {point.data.yFormatted}
                      &deg;
                      {isHistorical ? (
                        <Type color="textSecondary" variant="inherit">
                          <em> ({historicalYear})</em>
                        </Type>
                      ) : null}
                    </Type>
                  </Box>
                </Box>
              )
            })}
          </Box>
        )
      }}
    />
  )
}
