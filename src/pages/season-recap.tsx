// cspell:ignore actl accum
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import PageLayout from '@components/PageLayout/PageLayout'
import MainBox from '@components/boxes/MainBox'
import PageTitle from '@components/PageTitle/PageTitle'
import WideContainer from '@components/containers/WideContainer'
import {ResponsiveLine} from '@nivo/line'
import useSWR from 'swr'
import {stringify} from 'querystringify'
import {
  Box,
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
// import {BasicTooltip} from '@nivo/tooltip'
import round from '@lib/round'
import isNumber from 'is-number'
import {ChildBox, RowBox} from '@components/boxes/FlexBox'
import {getMonth, getYear, parse} from 'date-fns'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'
import lastTenWaterYears from '@lib/api/lastTenWaterYears'
import slugify from 'slugify'
import Spacing from '@components/boxes/Spacing'
import PrecipCalendar from '@components/season-recap/PrecipCalendar'
import TempDiffCalendar from '@components/season-recap/TempDiffCalendar'
import PrecipAccumLine from '@components/season-recap/PrecipAccumLine'
import PrecipMonthGroupBar from '@components/season-recap/PrecipMonthGroupBar'
import TempRangeLine from '@components/season-recap/TempRangeLine'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

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
        // Trace values are effectively 0.
        value: i[1]?.toLowerCase() === 't' ? 0 : parseFloat(i[1] ?? '')
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
              <PrecipAccumLine precipDataset={precipDataset} />
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
              <PrecipMonthGroupBar
                precipMoSmryData={precipMoSmryData}
                showHistPrecip={showHistPrecip}
              />
            </Box>

            <Box height={200}>
              <PrecipCalendar
                precipData={precipData}
                waterYear={waterYear}
                prevWaterYear={prevWaterYear}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box height={{xs: 400, lg: 450}}>
              <TempRangeLine tempDataset={tempDataset} />
            </Box>
            <Box
              height={200}
              // onMouseEnter={mouseEnterCalHandler}
              // onMouseLeave={mouseLeaveCalHandler}
            >
              <TempDiffCalendar
                tempObservedDiffData={tempObservedDiffData}
                waterYear={waterYear}
                prevWaterYear={prevWaterYear}
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
