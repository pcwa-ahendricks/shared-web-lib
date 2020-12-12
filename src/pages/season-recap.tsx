import React, {useMemo, useState} from 'react'
// import alpha from 'color-alpha'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {Layer, Point, ResponsiveLine} from '@nivo/line'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {blue, brown, deepOrange, green, red} from '@material-ui/core/colors'
import {Box, useTheme, Typography as Type} from '@material-ui/core'
import {ResponsiveEnhancedCalendar} from '@lib/enhanced-calendar'
import {BasicTooltip} from '@nivo/tooltip'
import round from '@lib/round'
import {Defs} from '@nivo/core'
import {area, curveMonotoneX} from 'd3-shape'
import isNumber from 'is-number'

type PointDataMeta = Point['data'] & {historicalYear?: string}

export default function SeasonRecapPage() {
  const theme = useTheme()
  const [waterYear] = useState(2020)
  const prevWaterYear = waterYear - 1
  const qs = stringify({sid: 'kblu', waterYear}, true)
  const {data: tempResponse} = useSWR<TempResponse>(`/api/acis/temp${qs}`)
  const {data: tempHistResponse} = useSWR<TempHistResponse>(
    `/api/acis/temp-hist${qs}`
  )
  const tempHistHighData = useMemo(
    () => ({
      id: 'Historical High',
      data:
        tempHistResponse?.smry[0]
          .map((i, idx) => ({
            x: tempResponse?.data[idx]?.[0],
            y: i[0],
            historicalYear: i[1]
          }))
          .filter((i) => i.x) ?? []
    }),
    [tempHistResponse, tempResponse]
  )
  const tempHistLowData = useMemo(
    () => ({
      id: 'Historical Low',
      data:
        tempHistResponse?.smry[1]
          .map((i, idx) => ({
            x: tempResponse?.data[idx]?.[0],
            y: i[0],
            historicalYear: i[1]
          }))
          .filter((i) => i.x) ?? []
    }),
    [tempHistResponse, tempResponse]
  )
  const tempNormalHighData = useMemo(
    () => ({
      id: 'Normal High Range',
      data:
        tempResponse?.data.map((i) => ({
          x: i[0],
          y: parseFloat(i[3] ?? '')
        })) ?? []
    }),
    [tempResponse]
  )
  const tempNormalLowData = useMemo(
    () => ({
      id: 'Normal Low Range',
      data:
        tempResponse?.data.map((i) => ({
          x: i[0],
          y: parseFloat(i[4] ?? '')
        })) ?? []
    }),
    [tempResponse]
  )
  console.log(tempResponse?.data)

  const tempObservedData = useMemo(
    () => ({
      id: 'Observed Range',
      data:
        tempResponse?.data
          .map((i) => ({
            x: i[0],
            y0: parseFloat(i[1] ?? ''),
            y1: parseFloat(i[2] ?? '')
          }))
          // NaN's in dataset, resulting from missing data marked as "M" in Acis datasets, will break nivo graph at the start of the first NaN occurrence (null values are okay)
          .filter((i) => isNumber(i.y0) && isNumber(i.y1))
          .map(({x, y0, y1}) => {
            return [
              {
                x,
                y: y0
              },
              {x, y: y1},
              {x, y: null}
            ]
          })
          .reduce((p, c) => [...p, ...c], []) ?? []
    }),
    [tempResponse]
  )

  const tempObservedDiffData = useMemo(
    () =>
      tempResponse?.data.map((i) => ({
        day: i[0],
        value: parseFloat(i[1] ?? '') - parseFloat(i[3] ?? '')
      })) ?? [],
    [tempResponse]
  )

  // console.log(tempNormalHighData)
  // console.log(tempNormalLowData)
  // console.log(tempObservedData)
  // console.log(tempObservedDiffData)

  // const [monthSpacing, setMonthSpacing] = useState(0)
  // const mouseEnterCalHandler = useCallback(() => setMonthSpacing(12), [])
  // const mouseLeaveCalHandler = useCallback(() => setMonthSpacing(0), [])

  const AreaLayer: Layer = ({series, xScale, yScale}) => {
    // Using area() is easier with combined series data.
    const y1SeriesData = series.find((s) => s.id === 'Normal High Range')?.data
    const y0SeriesData = series.find((s) => s.id === 'Normal Low Range')?.data
    if (
      !y1SeriesData ||
      y1SeriesData.length <= 0 ||
      !y0SeriesData ||
      y0SeriesData.length <= 0
    )
      return null
    const seriesData: any = y1SeriesData.map((i, idx) => ({
      ...i,
      data: {
        x: i.data.x,
        y0: y0SeriesData[idx].data.y,
        y1: i.data.y
      }
    }))
    // console.log('all', seriesData)
    const areaGenerator = area()
      .x((h: any) => xScale(h.data.x))
      .y0((h: any) => yScale(h.data.y0))
      .y1((h: any) => yScale(h.data.y1))
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
  }

  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Basic Template" subtitle="Page Subtitle" />
          <Box height={{xs: 400, lg: 450}}>
            <ResponsiveLine
              data={[
                tempObservedData,
                tempHistLowData,
                tempHistHighData,
                tempNormalLowData,
                tempNormalHighData
              ]}
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
                      const historicalHighYear = data.historicalYear?.substring(
                        0,
                        4
                      )
                      const historicalLowYear = data.historicalYear?.substring(
                        0,
                        4
                      )
                      const isHistorical = /historical/i.test(
                        point.serieId.toString()
                      )
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
                              <strong>{point.serieId}</strong>{' '}
                              {point.data.yFormatted}
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
          </Box>
          <Box
            height={200}
            // onMouseEnter={mouseEnterCalHandler}
            // onMouseLeave={mouseLeaveCalHandler}
          >
            <ResponsiveEnhancedCalendar
              data={tempObservedDiffData}
              from={`${prevWaterYear}-10-02`} // Bug w/ EnhancedCal? Offset required for display.
              to={`${waterYear}-09-30`}
              // monthSpacing={monthSpacing}
              tooltip={({value, day, color}) => {
                if (value === undefined || isNaN(value)) return null
                const newVal = `${round(Math.abs(value))}° ${
                  value > 0 ? 'warmer' : 'cooler'
                }`
                return (
                  <BasicTooltip
                    id={day}
                    value={newVal}
                    color={color}
                    enableChip={true}
                  />
                )
              }}
              granularity="month"
              emptyColor={theme.palette.grey[200]}
              minValue={-25}
              maxValue={25}
              margin={{top: 40, right: 40, bottom: 40, left: 40}}
              // yearSpacing={40}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              // colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
              colors={[
                // '#a50026',
                // '#d73026',
                // '#f46d43',
                // '#fead61',
                // '#fee091',
                // blue[900],
                blue[700],
                // blue[400],
                blue[300],
                blue[100],
                // '#feffbf', // light yellow
                // theme.palette.grey[400],
                // green[100],
                // alpha('#d7ffc1', 0.4),
                brown[100],
                deepOrange[100],
                deepOrange[300],
                // deepOrange[400],
                deepOrange[700]
                // deepOrange[900]
                // '#ebe4d2',
                // '#e0f3f8',
                // '#a0cad9',
                // '#74add1',
                // '#4475b4',
                // '#313695'
              ]}
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'row',
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: 'right-to-left'
                }
              ]}
            />
          </Box>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

interface TempResponse {
  meta: TempMeta
  data: string[][]
}

interface TempMeta {
  uid: number
  ll: number[]
  sids: string[]
  state: string
  elev: number
  name: string
}
interface TempHistResponse {
  meta: TempHistMeta
  smry: string[][][]
}

interface TempHistMeta {
  state: string
  sids: string[]
  name: string
  valid_daterange: string[][]
}
