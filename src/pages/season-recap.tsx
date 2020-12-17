// cspell:ignore actl accum
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {CustomLayer, CustomLayerProps, Point, ResponsiveLine} from '@nivo/line'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {
  blue,
  blueGrey,
  brown,
  deepOrange,
  green,
  orange,
  red,
  teal
} from '@material-ui/core/colors'
import {
  Box,
  useTheme,
  Typography as Type,
  Paper,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  Switch,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel
} from '@material-ui/core'
import {ResponsiveEnhancedCalendar} from '@kevinmoe/nivo-fork-calendar'
// import {BasicTooltip} from '@nivo/tooltip'
import round from '@lib/round'
import {Defs} from '@nivo/core'
import {area, curveMonotoneX} from 'd3-shape'
import isNumber from 'is-number'
import SquareIcon from 'mdi-material-ui/Square'
import {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
import {getMonth, getYear, parse} from 'date-fns'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import slugify from 'slugify'
import {ResponsiveBar} from '@nivo/bar'
import {BoxLegendSvg} from '@nivo/legends'
import alpha from 'color-alpha'
import Spacing from '@components/boxes/Spacing'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type PointDataMeta = Point['data'] & {historicalYear?: string}

const stationIds = [
  '040897 2', // Blue Canyon
  '040383 2',
  '041912 2',
  '043134 2',
  '043491 2',
  '048758 2',
  '043891 2' // Hell Hole
]

export default function SeasonRecapPage() {
  const theme = useTheme()
  const wtrYrMenuItems = useMemo(
    () => lastTenWaterYears().sort((a, b) => b - a),
    []
  )
  const stationMenuItems = stationIds
  const [waterYear, setWaterYear] = useState(2021)
  const [sid, setSid] = useState('040897 2')
  const prevWaterYear = waterYear - 1
  const qs = stringify({sid: slugify(sid), waterYear}, true)
  const {data: tempResponse} = useSWR<TempResponse>(`/api/acis/temp${qs}`)
  const {data: tempHistResponse} = useSWR<TempHistResponse>(
    `/api/acis/temp-hist${qs}`
  )
  const {data: precipResponse} = useSWR<PrecipResponse>(`/api/acis/precip${qs}`)
  const {data: precipHistResponse} = useSWR<PrecipHistResponse>(
    `/api/acis/precip-hist${qs}`
  )
  const {data: precipMoSmryResponse} = useSWR<PrecipMoSmryResponse>(
    `/api/acis/precip-monthly-smry${qs}`
  )

  const precipMoSmryData = useMemo(() => {
    const smryData = precipMoSmryResponse?.smry[0] ?? []
    const data = precipMoSmryResponse?.data.find((i) => {
      const [iYear] = i
      return parseInt(iYear, 10) === waterYear
    })
    return (
      data?.[1].map((m, idx) => {
        const mean = parseFloat(smryData[idx][0])
        const high = parseFloat(smryData[idx][1][0])
        const low = parseFloat(smryData[idx][2][0])
        return {
          month: getWtrYrMonth(idx),
          actualPrecip: isNumber(parseFloat(m)) ? parseFloat(m) : 0,
          meanPrecip: isNumber(mean) ? mean : 0,
          highPrecip: isNumber(high) ? high : 0,
          lowPrecip: isNumber(low) ? low : 0,
          label: `${waterYear - 1}-${waterYear}`
        }
      }) ?? []
    )
  }, [waterYear, precipMoSmryResponse])

  const precipAccumData = useMemo(
    () => ({
      id: 'Accumulated Precipitation',
      data: (
        precipResponse?.data.map((i) => ({
          x: i[0],
          y: parseFloat(i[1] ?? '')
        })) ?? []
      ).reduce<{y: number; x: string; actual: number}[]>((prev, curr) => {
        const actual = isNumber(curr.y) ? curr.y : 0
        const prevLastY = prev.slice(-1)[0]?.y
        const prevTotal = isNumber(prevLastY) ? prevLastY : 0
        return [
          ...prev,
          {
            ...curr,
            y: prevTotal + actual,
            actual
          }
        ]
      }, [])
    }),
    [precipResponse]
  )

  const precipData = useMemo(
    () =>
      precipResponse?.data.map((i) => ({
        day: i[0],
        value: parseFloat(i[1] ?? '')
      })) ?? [],
    [precipResponse]
  )

  const precipAccumHistHighYear = useMemo(() => {
    const highYearDateStr = precipHistResponse?.data.reduce((prev, curr) => {
      const prevValue = parseFloat(prev?.[1]?.[0])
      const currValue = parseFloat(curr[1][0])
      if (!isNumber(prevValue)) {
        return curr
      }
      return isNumber(currValue) && currValue > prevValue ? curr : prev
    })[0]
    return parseWaterYear(highYearDateStr)
  }, [precipHistResponse])

  const qsPrecipHigh = stringify(
    {sid, waterYear: precipAccumHistHighYear},
    true
  )
  const {data: precipAccumHistHighResponse} = useSWR<PrecipResponse>(
    precipAccumHistHighYear ? `/api/acis/precip-hist-yr${qsPrecipHigh}` : null
  )
  const precipAccumHistHighData = useMemo(
    () => ({
      id: 'Recorded High',
      data: (
        precipAccumHistHighResponse?.data.map((i, idx) => ({
          // x: i[0],
          x: precipResponse?.data[idx]?.[0] ?? '',
          y: parseFloat(i[1] ?? '')
        })) ?? []
      )
        .filter((i) => i.x)
        .reduce<{y: number; x: string; actual: number}[]>((prev, curr) => {
          const actual = isNumber(curr.y) ? curr.y : 0
          const prevLastY = prev.slice(-1)[0]?.y
          const prevTotal = isNumber(prevLastY) ? prevLastY : 0
          return [
            ...prev,
            {
              ...curr,
              y: prevTotal + actual,
              actual
            }
          ]
        }, [])
    }),
    [precipAccumHistHighResponse, precipResponse]
  )

  const precipAccumHistLowYear = useMemo(() => {
    const lowYearDateStr = precipHistResponse?.data.reduce((prev, curr) => {
      const prevValue = parseFloat(prev?.[1]?.[0])
      const currValue = parseFloat(curr[1][0])
      if (!isNumber(prevValue)) {
        return curr
      }
      return isNumber(currValue) && currValue < prevValue ? curr : prev
    })[0]
    return parseWaterYear(lowYearDateStr)
  }, [precipHistResponse])

  const qsPrecipLow = stringify({sid, waterYear: precipAccumHistLowYear}, true)
  const {data: precipAccumHistLowResponse} = useSWR<PrecipResponse>(
    precipAccumHistLowYear ? `/api/acis/precip-hist-yr${qsPrecipLow}` : null
  )
  const precipAccumHistLowData = useMemo(
    () => ({
      id: 'Recorded Low',
      data: (
        precipAccumHistLowResponse?.data.map((i, idx) => ({
          // x: i[0],
          x: precipResponse?.data[idx]?.[0] ?? '',
          y: parseFloat(i[1] ?? '')
        })) ?? []
      )
        .filter((i) => i.x)
        .reduce<{y: number; x: string; actual: number}[]>((prev, curr) => {
          const actual = isNumber(curr.y) ? curr.y : 0
          const prevLastY = prev.slice(-1)[0]?.y
          const prevTotal = isNumber(prevLastY) ? prevLastY : 0
          return [
            ...prev,
            {
              ...curr,
              y: prevTotal + actual,
              actual
            }
          ]
        }, [])
    }),
    [precipAccumHistLowResponse, precipResponse]
  )

  const precipNormalAccumData = useMemo(
    () => ({
      id: 'Normal Accum. Precip.',
      data: (
        precipResponse?.data.map((i) => ({
          x: i[0],
          y: parseFloat(i[2] ?? '')
        })) ?? []
      )
        .filter((i) => i.x)
        .reduce<{y: number; x: string; actual: number}[]>((prev, curr) => {
          const actual = isNumber(curr.y) ? curr.y : 0
          const prevLastY = prev.slice(-1)[0]?.y
          const prevTotal = isNumber(prevLastY) ? prevLastY : 0
          return [
            ...prev,
            {
              ...curr,
              y: prevTotal + actual,
              actual
            }
          ]
        }, [])
    }),
    [precipResponse]
  )

  const precipAccumDiff = useMemo(() => {
    const precipAccum = precipAccumData.data.slice(-1)[0]?.y ?? null
    const precipAccumNormal = precipNormalAccumData.data.slice(-1)[0]?.y ?? null

    return isNumber(precipAccum) &&
      isNumber(precipAccumNormal) &&
      precipAccumNormal !== 0 // Don't show infinity values when Normal data is not present
      ? round((precipAccum / precipAccumNormal) * 100, 0)
      : null
  }, [precipAccumData, precipNormalAccumData])

  const tempHistHighData = useMemo(
    () => ({
      id: 'Historical High',
      data:
        tempHistResponse?.smry?.[0]
          .map((i, idx) => ({
            x: tempResponse?.data?.[idx]?.[0],
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
        tempHistResponse?.smry?.[1]
          .map((i, idx) => ({
            x: tempResponse?.data?.[idx]?.[0],
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
        tempResponse?.data?.map((i) => ({
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
        tempResponse?.data?.map((i) => ({
          x: i[0],
          y: parseFloat(i[4] ?? '')
        })) ?? []
    }),
    [tempResponse]
  )

  // Add a 20% margin to the chart on the Y axis for the top.
  const precipYScaleMax = useMemo(() => {
    const high = precipAccumHistHighData?.data.slice(-1)[0]?.y
    if (!isNumber(high)) {
      return null
    }
    const buffer = high * 0.2
    return round(high + buffer, 0)
  }, [precipAccumHistHighData])

  const tempObservedData = useMemo(
    () => ({
      id: 'Observed Range',
      data:
        tempResponse?.data
          ?.map((i) => ({
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
      tempResponse?.data?.map((i) => ({
        day: i[0],
        value: parseFloat(i[1] ?? '') - parseFloat(i[3] ?? '')
      })) ?? [],
    [tempResponse]
  )

  // const [monthSpacing, setMonthSpacing] = useState(0)
  // const mouseEnterCalHandler = useCallback(() => setMonthSpacing(12), [])
  // const mouseLeaveCalHandler = useCallback(() => setMonthSpacing(0), [])

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
  const [tabValue, setTabValue] = useState(0)

  const handleChange = useCallback(
    (_event: React.ChangeEvent<Record<string, unknown>>, newValue: any) => {
      setTabValue(newValue)
    },
    []
  )

  const yearSelectHandler = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      setWaterYear(event.target.value as number)
    },
    []
  )
  const stationSelectHandler = useCallback(
    (event: React.ChangeEvent<{value: unknown}>) => {
      setSid(event.target.value as string)
    },
    []
  )

  type LineDataProp = React.ComponentProps<typeof ResponsiveLine>['data']
  const [precipDataset, setPrecipDataset] = useState<LineDataProp>([])
  useEffect(() => {
    setTimeout(() => {
      setPrecipDataset([
        precipAccumHistLowData,
        precipAccumHistHighData,
        precipNormalAccumData,
        precipAccumData
      ])
    })
  }, [
    precipAccumData,
    precipNormalAccumData,
    precipAccumHistHighData,
    precipAccumHistLowData
  ])

  const [tempDataset, setTempDataset] = useState<LineDataProp>([])
  useEffect(() => {
    setTimeout(() => {
      setTempDataset([
        tempObservedData,
        tempHistLowData,
        tempHistHighData,
        tempNormalLowData,
        tempNormalHighData
      ])
    })
  }, [
    tempObservedData,
    tempHistLowData,
    tempHistHighData,
    tempNormalLowData,
    tempNormalHighData
  ])

  const [showHistPrecip, setShowHistPrecip] = useState(false)

  const histPrecipSwitchHandler = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setShowHistPrecip(event.target.checked)
    },
    []
  )

  const precipMoSmryChartColors = useMemo(
    () => [
      blue[600],
      alpha(brown[100], 0.6),
      ...(showHistPrecip ? [alpha(teal[200], 0.4)] : []),
      ...(showHistPrecip ? [alpha(orange[200], 0.6)] : [])
    ],
    [showHistPrecip]
  )

  const precipMoSmryChartKeys = useMemo(
    () => [
      'actualPrecip',
      'meanPrecip',
      ...(showHistPrecip ? ['highPrecip'] : []),
      ...(showHistPrecip ? ['lowPrecip'] : [])
    ],
    [showHistPrecip]
  )

  const precipMoSmryChartLegendLabels = useMemo(
    () => [
      'Precipitation',
      'Historical Average',
      ...(showHistPrecip ? ['Historical High'] : []),
      ...(showHistPrecip ? ['Historical Low'] : [])
    ],
    [showHistPrecip]
  )

  const styleById = useMemo(
    () =>
      ({
        'Accumulated Precipitation': {
          strokeWidth: 5
        },
        'Recorded High': {
          strokeWidth: 2,
          strokeDasharray: '4, 3'
        },
        'Recorded Low': {
          strokeWidth: 2,
          strokeDasharray: '4, 3'
        },
        'Normal Accum. Precip.': {
          strokeDasharray: '1, 10',
          strokeWidth: 5,
          strokeLinejoin: 'round',
          strokeLinecap: 'round'
        },
        default: {
          strokeWidth: 2
        }
      } as {[key: string]: React.SVGProps<SVGPathElement>['style']}),
    []
  )

  const PrecipLines: CustomLayer = useMemo(
    () => ({series, lineGenerator, xScale, yScale}) => {
      return series.map(({id, data, color}) => {
        const idStr = id.toString()
        return (
          <path
            key={id}
            d={lineGenerator(
              data.map((d) => ({
                ...(d.data?.x != null &&
                  d.data?.y != undefined && {x: xScale(d.data?.x)}),
                ...(d.data?.y != null &&
                  d.data?.y != undefined && {y: yScale(d.data?.y)})
              }))
            )}
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
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Basic Template" subtitle="Page Subtitle" />

          <Paper square>
            <Tabs
              value={tabValue}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab
                icon={<WeatherIcon name="raindrop" />}
                label="PRECIPITATION"
                {...a11yProps(0)}
              />
              <Tab
                icon={<WeatherIcon name="day-sunny" />}
                label="TEMPERATURE"
                {...a11yProps(1)}
              />
            </Tabs>
          </Paper>

          <FormControl style={{minWidth: 140}}>
            <InputLabel id="water-year-select-label">Water Year</InputLabel>
            <Select
              labelId="water-year-select-label"
              id="water-year-select"
              value={waterYear}
              onChange={yearSelectHandler}
            >
              {wtrYrMenuItems.map((y, idx) => (
                <MenuItem key={idx} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="station-select-label">Station</InputLabel>
            <Select
              labelId="station-select-label"
              id="station-select"
              value={sid}
              onChange={stationSelectHandler}
            >
              {stationMenuItems.map((y, idx) => (
                <MenuItem key={idx} value={y}>
                  {y}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TabPanel value={tabValue} index={0}>
            {precipAccumDiff ? (
              <Type variant="h4">
                <Type color="primary" variant="inherit">
                  <strong>{precipAccumDiff}%</strong>
                </Type>{' '}
                of Normal Average
              </Type>
            ) : null}
            <Box height={{xs: 400, lg: 450}}>
              <ResponsiveLine
                data={precipDataset}
                colors={[orange[300], teal[200], brown[200], blue[600]]}
                // layers={['grid', 'markers', 'axes', 'areas', 'crosshair', 'lines', 'points', 'slices', 'mesh', 'legends']}
                layers={[
                  'grid',
                  'markers',
                  'axes',
                  'areas',
                  'crosshair',
                  // 'lines',
                  PrecipLines,
                  'points',
                  'slices',
                  'mesh',
                  'legends'
                ]}
                margin={{top: 50, right: 170, bottom: 50, left: 60}}
                xScale={{
                  type: 'time',
                  format: '%Y-%m-%d',
                  useUTC: false,
                  precision: 'day'
                }}
                xFormat="time:%Y-%m-%d"
                yScale={{
                  type: 'linear',
                  min: 0,
                  max: precipYScaleMax ?? 'auto',
                  stacked: false,
                  reverse: false
                }}
                yFormat=" >-.1f"
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
                  legend: 'Precipitation (inches)',
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
                // enableSlices="x"
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
              />
            </Box>

            <Spacing size="large" />
            <RowBox justifyContent="flex-end">
              <ChildBox>
                <FormControl component="fieldset" size="small">
                  <FormLabel component="legend">Chart Options</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          size="small"
                          checked={showHistPrecip}
                          onChange={histPrecipSwitchHandler}
                          name="showHistPrecip"
                        />
                      }
                      label="Show Historical High/Low"
                    />
                  </FormGroup>
                  {/* <FormHelperText> year range?</FormHelperText> */}
                </FormControl>
              </ChildBox>
            </RowBox>
            <Box height={450}>
              <ResponsiveBar
                data={precipMoSmryData}
                keys={precipMoSmryChartKeys}
                indexBy="month"
                margin={{top: 50, right: 140, bottom: 50, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                colors={precipMoSmryChartColors}
                groupMode="grouped"
                defs={[
                  // {
                  //   id: 'dots',
                  //   type: 'patternDots',
                  //   background: 'inherit',
                  //   color: '#38bcb2',
                  //   size: 4,
                  //   padding: 1,
                  //   stagger: true
                  // },
                  {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: alpha(brown[200], 0.2),
                    rotation: -45,
                    lineWidth: 3,
                    spacing: 10
                  }
                ]}
                // fill={[
                //   {
                //     match: {
                //       id: ''
                //     },
                //     id: 'dots'
                //   },
                //   {
                //     match: {
                //       id: 'meanPrecip'
                //     },
                //     id: 'lines'
                //   }
                // ]}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0
                  // legend: 'Month',
                  // legendPosition: 'middle',
                  // legendOffset: 32
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Precipitation (inches)',
                  legendPosition: 'middle',
                  legendOffset: -40
                }}
                // d looks like {
                //   "id": "actualPrecip",
                //   "value": 1.92,
                //   "index": 1,
                //   "indexValue": "Dec",
                //   "data": {
                //     "actualPrecip": 1.92,
                //     "month": "Dec",
                //     "label": "2020-2021"
                //   }
                // }
                enableLabel={false}
                // labelSkipWidth={12}
                // labelSkipHeight={12}
                // labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                // label={(d: any) => `${d.data.label}`}
                // layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']}
                layers={['grid', 'axes', 'bars', 'markers', BarLegend]}
                legends={[
                  {
                    data: precipMoSmryChartKeys.map((id, index) => ({
                      id,
                      color: precipMoSmryChartColors[index],
                      label: precipMoSmryChartLegendLabels[index]
                    })),
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemOpacity: 1
                        }
                      }
                    ]
                  }
                ]}
              />
            </Box>

            <Box height={200}>
              <ResponsiveEnhancedCalendar
                data={precipData}
                from={`${prevWaterYear}-10-02`} // Bug w/ EnhancedCal? Offset required for display.
                to={`${waterYear}-09-30`}
                // monthSpacing={monthSpacing}
                granularity="month"
                emptyColor={theme.palette.grey[200]}
                undefinedColor={theme.palette.grey[700]}
                minValue={-0.66}
                maxValue={2}
                margin={{top: 40, right: 40, bottom: 40, left: 40}}
                // yearSpacing={40}
                monthBorderColor="#ffffff"
                dayBorderWidth={2}
                dayBorderColor="#ffffff"
                // colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
                colors={[blueGrey[100], blue[200], blue[400], blue[700]]}
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
                tooltip={({value, day, color}) => {
                  if (value === undefined || isNaN(value)) return null
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
                        <ChildBox style={{marginTop: 2, paddingRight: 6}}>
                          <Type variant="caption">{day}:</Type>
                        </ChildBox>
                        <ChildBox style={{marginTop: 2}}>
                          <Type variant="caption">
                            <strong>{`${round(value, 1)}"`}</strong>
                          </Type>
                        </ChildBox>
                      </RowBox>
                    </Box>
                  )
                }}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box height={{xs: 400, lg: 450}}>
              <ResponsiveLine
                data={tempDataset}
                // colors={{scheme: 'red_yellow_green'}}
                colors={[
                  blue[700],
                  green[100],
                  red[100],
                  brown[100],
                  brown[100]
                ]}
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
                        <ChildBox style={{marginTop: 2, paddingRight: 6}}>
                          <Type variant="caption">{day}:</Type>
                        </ChildBox>
                        <ChildBox style={{marginTop: 2}}>
                          <Type variant="caption">
                            <strong>{newVal}</strong>
                          </Type>
                        </ChildBox>
                      </RowBox>
                    </Box>
                  )
                  // return (
                  // <BasicTooltip
                  //   id={day}
                  //   value={newVal}
                  //   color={color}
                  //   enableChip={true}
                  // />
                  // )
                }}
                granularity="month"
                emptyColor={theme.palette.grey[200]}
                undefinedColor={theme.palette.grey[700]}
                minValue={-22}
                maxValue={22}
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
          </TabPanel>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

interface TempResponse {
  meta: TempMeta
  data?: string[][]
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

interface PrecipResponse {
  meta: PrecipMeta
  data: string[][]
}

interface PrecipMeta {
  state: string
  sids: string[]
  name: string
  valid_daterange: string[][]
}

interface PrecipHistResponse {
  data: [string, [string, number]][]
}

function parseWaterYear(dateStr?: string) {
  if (!dateStr) {
    return null
  }
  const highYearDate = parse(dateStr, 'yyyy-MM-dd', new Date())
  const month = getMonth(highYearDate) + 1
  const year = getYear(highYearDate)
  if ([10, 11, 12].indexOf(month) >= 0) {
    return year + 1
  }
  return year
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Box>
  )
}

interface PrecipMoSmryResponse {
  meta: PrecipMoSmryMeta
  data: [string, string[]][]
  smry: [string, string[], string[]][][]
}

interface PrecipMoSmryMeta {
  state: string
  sids: string[]
  name: string
}

function getWtrYrMonth(index: number) {
  switch (index) {
    case 0:
      return 'Oct'
    case 1:
      return 'Nov'
    case 2:
      return 'Dec'
    case 3:
      return 'Jan'
    case 4:
      return 'Feb'
    case 5:
      return 'Mar'
    case 6:
      return 'Apr'
    case 7:
      return 'May'
    case 8:
      return 'Jun'
    case 9:
      return 'Jul'
    case 10:
      return 'Aug'
    case 11:
      return 'Sep'
    default:
      return 'Other'
  }
}

function BarLegend({
  height,
  legends,
  width
}: {
  height: React.ComponentProps<typeof BoxLegendSvg>['containerHeight']
  width: React.ComponentProps<typeof BoxLegendSvg>['containerWidth']
  legends: React.ComponentProps<typeof ResponsiveBar>['legends']
}) {
  if (!legends || legends.length <= 0) {
    return <></>
  }
  return (
    <>
      {legends.map((legend) => {
        if (!legend || !legend.data) {
          return <></>
        }
        return (
          <BoxLegendSvg
            key={JSON.stringify(legend.data.map(({id}) => id))}
            {...legend}
            containerHeight={height}
            containerWidth={width}
          />
        )
      })}
    </>
  )
}
