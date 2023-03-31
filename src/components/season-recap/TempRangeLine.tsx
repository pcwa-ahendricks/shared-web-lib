// cspell:ignore accum rnge nrml
import {brown, green, red, blue, blueGrey as grey} from '@mui/material/colors'
import {
  Serie,
  CustomLayer,
  CustomLayerProps,
  ResponsiveLine,
  Point
} from '@nivo/line'
import React, {useCallback, useMemo} from 'react'
import {Defs} from '@nivo/core'
import {area, curveMonotoneX} from 'd3-shape'
import {Box, useTheme, Typography as Type} from '@mui/material'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import BarChartIcon from '@mui/icons-material/BarChart'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import {LegendProps} from '@nivo/legends'
import isNumber from 'is-number'

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
        .x(({data}) => (xScale as any)(data.x ? data.x : ''))
        .y0(({data}) => (yScale as any)(data.y0 ? data.y0 : ''))
        .y1(({data}) => (yScale as any)(data.y1 ? data.y1 : ''))
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
  const tempDataLength = tempDataset
    .find((s) => s.id === 'Observed Range')
    ?.data.filter((v) => v.y).length

  const obsRangeLineWidth = useMemo(() => {
    const length = tempDataLength ? tempDataLength / 2 : null
    switch (true) {
      case !length:
        return 3
      case length && length > 275:
        return 1
      case length && length > 150:
        return 1.5
      case length && length > 100:
        return 2
      default:
        return 3
    }
  }, [tempDataLength])

  const recordLineWidth = useMemo(() => {
    const length = tempDataLength ? tempDataLength / 2 : null
    switch (true) {
      case !length:
        return 2
      case length && length > 275:
        return 1.5
      case length && length > 150:
        return 1.75
      default:
        return 2
    }
  }, [tempDataLength])

  const styleById = useMemo(
    () =>
      ({
        'Historical High': {
          strokeWidth: recordLineWidth
        },
        'Historical Low': {
          strokeWidth: recordLineWidth
        },
        default: {
          strokeWidth: 2.0
        }
      } as {[key: string]: React.SVGProps<SVGPathElement>['style']}),
    [recordLineWidth]
  )
  const TempLines: CustomLayer = useMemo(
    () =>
      ({series, lineGenerator, xScale, yScale}) => {
        return series.map(({id, data, color}) => {
          const idStr = id.toString()
          if (id === 'Observed Range') {
            return
          }
          return (
            <path
              key={id}
              d={
                lineGenerator(
                  data.map((d): any => ({
                    ...(d.data?.x != null &&
                      d.data?.x != undefined && {
                        x: (xScale as any)(d.data?.x)
                      }),
                    ...(d.data?.y != null &&
                      d.data?.y != undefined && {y: (yScale as any)(d.data?.y)})
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

  const colors = [blue[700], green[100], red[100], brown[100], brown[100]]

  const legendConfig: LegendProps['data'] = [
    {
      id: 'Observed Range"',
      color: colors[0],
      label: 'Observed Range'
    },
    {
      id: 'Normal High/Low Range',
      color: colors[4],
      label: 'Average Range'
    },
    {
      id: 'Historical High',
      color: colors[2],
      label: 'Historical High'
    },
    {
      id: 'Historical Low',
      color: colors[1],
      label: 'Historical Low'
    }
  ]

  return (
    <ResponsiveLine
      data={tempDataset}
      // colors={{scheme: 'red_yellow_green'}}
      colors={colors}
      margin={{top: 30, right: 40, bottom: 80, left: 70}}
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
        // orient: 'left',
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
      lineWidth={obsRangeLineWidth}
      layers={[
        AreaLayer,
        'grid',
        'markers',
        'axes',
        'areas',
        'crosshair',
        TempLines,
        'lines',
        'points',
        'slices',
        'mesh',
        'legends'
      ]}
      legends={[
        {
          data: legendConfig,
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
      enableSlices="x"
      sliceTooltip={({slice}) => {
        const {points} = slice

        const obsRngePts = points
          .filter((p) => /observed range/i.test(p.serieId.toString()))
          .sort((a, b) => {
            const left =
              typeof a.data.y === 'number'
                ? a.data.y
                : parseFloat(a.data.y.toString())
            const right =
              typeof b.data.y === 'number'
                ? b.data.y
                : parseFloat(b.data.y.toString())
            return left - right
          })

        const noData =
          !isNumber(obsRngePts[0]?.data.y) || !isNumber(obsRngePts[1]?.data.y)

        const ObsRangeLabel = () => (
          <RowBox alignItems="center">
            <ColumnBox justifyContent="center" pr={0.5}>
              <BarChartIcon
                fontSize="small"
                style={{color: noData ? grey[200] : obsRngePts[0]?.serieColor}}
              />
            </ColumnBox>
            <ChildBox style={{paddingRight: 6}}>
              <Type variant="caption">Observed Range:</Type>
            </ChildBox>
            <ChildBox>
              <Type variant="caption">
                <strong>
                  {!noData ? (
                    <>
                      {`${obsRngePts[0]?.data.yFormatted}`}&deg; -{' '}
                      {`${obsRngePts[1]?.data.yFormatted}`}&deg;
                    </>
                  ) : (
                    <Type variant="inherit" color="error">
                      <em>No Data</em>
                    </Type>
                  )}
                </strong>
              </Type>
            </ChildBox>
          </RowBox>
        )
        const nrmlRngePts = points
          .filter((p) => /normal.*range/i.test(p.serieId.toString()))
          .sort((a, b) => {
            const left =
              typeof a.data.y === 'number'
                ? a.data.y
                : parseFloat(a.data.y.toString())
            const right =
              typeof b.data.y === 'number'
                ? b.data.y
                : parseFloat(b.data.y.toString())
            return left - right
          })

        const noNrmlData =
          !isNumber(nrmlRngePts[0]?.data.y) || !isNumber(nrmlRngePts[1]?.data.y)

        const NrmlRangeLabel = () => (
          <RowBox alignItems="center">
            <ColumnBox justifyContent="center" pr={0.5}>
              <DragHandleIcon
                fontSize="small"
                style={{color: nrmlRngePts[0]?.serieColor}}
              />
            </ColumnBox>

            <ChildBox style={{paddingRight: 6}}>
              <Type variant="caption">Average Range:</Type>
            </ChildBox>
            <ChildBox>
              <Type variant="caption">
                <strong>
                  {!noNrmlData ? (
                    <>
                      {`${nrmlRngePts[0]?.data.yFormatted}`}&deg; -{' '}
                      {`${nrmlRngePts[1]?.data.yFormatted}`}&deg;
                    </>
                  ) : (
                    <Type variant="inherit" color="error">
                      <em>No Data</em>
                    </Type>
                  )}
                </strong>
              </Type>
            </ChildBox>
          </RowBox>
        )

        const highLowLabels = points
          .filter((p) => !/observed range/i.test(p.serieId.toString()))
          .filter((p) => !/normal.*range/i.test(p.serieId.toString()))
          .map((point) => {
            const {serieId, id, serieColor} = point
            const data: PointDataMeta = point.data
            const historicalHighYear = data.historicalYear?.substring(0, 4)
            const historicalLowYear = data.historicalYear?.substring(0, 4)
            const isHistorical = /historical/i.test(serieId.toString())
            const isHistoricalLow = /historical low/i.test(serieId.toString())
            const isHistoricalHigh = /historical high/i.test(serieId.toString())
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
              <RowBox alignItems="center" key={id}>
                <ColumnBox justifyContent="center" pr={0.5}>
                  <ShowChartIcon fontSize="small" style={{color: serieColor}} />
                </ColumnBox>
                <ChildBox style={{paddingRight: 6}}>
                  <Type variant="caption">{serieId}:</Type>
                </ChildBox>
                <ChildBox>
                  <Type variant="caption">
                    <strong>
                      {data.yFormatted}
                      &deg;
                    </strong>
                    {isHistorical ? (
                      <Type color="textSecondary" variant="inherit">
                        <em> ({historicalYear})</em>
                      </Type>
                    ) : null}
                  </Type>
                </ChildBox>
              </RowBox>
            )
          })
        const HighLabel = () => highLowLabels[0] ?? null
        const LowLabel = () => highLowLabels[1] ?? null
        return (
          <Box
            bgcolor={theme.palette.common.white}
            px={1}
            py={0.5}
            boxShadow={4}
            borderRadius="3px"
          >
            {/* <div>x: {slice.id}</div> */}
            <Type variant="caption">{points[0].data.xFormatted}</Type>
            <ObsRangeLabel />
            <NrmlRangeLabel />
            <HighLabel />
            <LowLabel />
          </Box>
        )
      }}
    />
  )
}
