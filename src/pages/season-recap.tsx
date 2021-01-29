// cspell:ignore actl accum climdiv frmt perc Prcp dprt Nrml rgnl stns mxtemp
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Image from 'next/image'
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
  FormControlLabel,
  Divider,
  Hidden
} from '@material-ui/core'
// import {BasicTooltip} from '@nivo/tooltip'
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
import {multiFetcher} from '@lib/fetcher'
import toTitleCase from '@lib/toTitleCase'
import StnMap from '@components/season-recap/StnMap'
import StationInfo from '@components/season-recap/StationInfo'
import RegionalSection from '@components/season-recap/RegionalSection'
import StationSnowfall from '@components/season-recap/StationSnowfall'
import round from '@lib/round'
import Animate, {AnimateProps} from '@components/Animate/Animate'
const isDev = process.env.NODE_ENV === 'development'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type LineDataProp = React.ComponentProps<typeof ResponsiveLine>['data']

const stationIds = [
  '040897 2',
  '040383 2',
  '041912 2',
  '043134 2',
  '043491 2',
  '048758 2',
  '043891 2'
] as const

export type StationId = typeof stationIds[number]

type StationInfo =
  | Partial<
      {
        [key in StationId]: StationMeta
      }
    >
  | undefined

export const refreshInterval = 1000 * 60 * 60 * 6 // 6 hr interval.

export default function SeasonRecapPage() {
  const wtrYrMenuItems = useMemo(
    () => lastTenWaterYears().sort((a, b) => b - a),
    []
  )

  const stationIdUrls = stationIds.map(
    (sid) => `/api/acis/station-meta${stringify({sid: slugify(sid)}, true)}`
  )

  const {data: countyResponse} = useSWR<CountyMetaResponse>('/api/acis/county')
  const [waterYear, setWaterYear] = useState(getYear(new Date()))
  const [sid, setSid] = useState<StationId>('040897 2')

  const {data: stationMetaResponse} = useSWR<StationMetaResponse[]>(
    stationIdUrls,
    multiFetcher
  )
  const stationInfo = useMemo(
    () =>
      stationIds.reduce<StationInfo>((prev, stn) => {
        const res = stationMetaResponse?.find((m) =>
          m.meta[0].sids.find((s) => s === stn)
        )
        const resData = res?.meta[0]
        const prevObj = prev ?? {}
        if (!resData) {
          return {...prevObj}
        }
        const countyName =
          countyResponse?.meta.find((c) => c.id === resData?.county)?.name ??
          resData?.county ??
          ''
        resData.county = countyName
        return {...prevObj, [stn]: resData}
      }, undefined),
    [stationMetaResponse, countyResponse]
  )

  const selectedStationInfo = useMemo(
    () => (stationInfo ? stationInfo[sid] : null),
    [sid, stationInfo]
  )
  // console.log(selectedStationInfo)

  const qs = stringify({sid: slugify(sid), waterYear}, true)
  const {data: tempResponse} = useSWR<TempResponse>(`/api/acis/temp${qs}`, {
    refreshInterval
  })
  const {data: tempHistResponse} = useSWR<TempHistResponse>(
    `/api/acis/temp-hist${qs}`,
    {refreshInterval}
  )
  const {data: precipResponse} = useSWR<PrecipResponse>(
    `/api/acis/precip${qs}`,
    {refreshInterval}
  )
  const {data: precipHistResponse} = useSWR<PrecipHistResponse>(
    `/api/acis/precip-hist${qs}`,
    {refreshInterval}
  )
  const {data: precipMoSmryResponse} = useSWR<PrecipMoSmryResponse>(
    `/api/acis/precip-monthly-smry${qs}`,
    {refreshInterval}
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
        const highDate = smryData[idx][1][1]
        const low = parseFloat(smryData[idx][2][0])
        const lowDate = smryData[idx][2][1]
        return {
          month: getWtrYrMonth(idx),
          actualPrecip: isNumber(parseFloat(m)) ? parseFloat(m) : 0,
          meanPrecip: isNumber(mean) ? mean : 0,
          highPrecip: isNumber(high) ? high : 0,
          highDate,
          lowPrecip: isNumber(low) ? low : 0,
          lowDate,
          label: `${waterYear - 1}-${waterYear}`
        }
      }) ?? []
    )
  }, [waterYear, precipMoSmryResponse])

  const precipAccumData = useMemo(
    () => ({
      id: 'Accumulated Precip.',
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
    precipAccumHistHighYear ? `/api/acis/precip-hist-yr${qsPrecipHigh}` : null,
    {refreshInterval}
  )

  const precipAccumHistHighData = useMemo(
    () => ({
      id: 'Recorded High',
      data: (
        precipAccumHistHighResponse?.data.map((i, idx) => ({
          // x: i[0], // High date
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
    precipAccumHistLowYear ? `/api/acis/precip-hist-yr${qsPrecipLow}` : null,
    {refreshInterval}
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
      id: 'Average Accum. Precip.',
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
      setSid(event.target.value as StationId)
    },
    []
  )

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
  const TabPanel = useCallback(
    ({children, value, index, ...other}: TabPanelProps) => (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Box>
    ),
    []
  )

  const Fade = useCallback(
    ({children, ...rest}: Partial<AnimateProps>) => (
      <Animate name="fadeIn" hideUntilAnimate {...rest}>
        {children}
      </Animate>
    ),
    []
  )

  return (
    <PageLayout title="Weather & Climate" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle subtitle="Season Recap" title="Weather & Climate" />
          <Spacing />
          <RegionalSection countyResponse={countyResponse} />

          <Spacing size="large" factor={2} />

          <Type variant="h2" color="primary">
            Local/Station Conditions
          </Type>
          <Spacing />
          <RowBox justifyContent="flex-start" flexSpacing={5}>
            <ChildBox flex="0 1 25%">
              <FormControl style={{minWidth: 140}} fullWidth>
                <InputLabel id="water-year-select-label">Water Year</InputLabel>
                <Select
                  labelId="water-year-select-label"
                  id="water-year-select"
                  value={waterYear}
                  onChange={yearSelectHandler}
                >
                  {wtrYrMenuItems.map((y, idx) => (
                    <MenuItem key={idx} value={y}>
                      {`${y - 1}-${y}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ChildBox>
            <ChildBox flex="0 1 25%">
              <FormControl fullWidth>
                <InputLabel id="station-select-label">Station</InputLabel>
                <Select
                  labelId="station-select-label"
                  id="station-select"
                  value={sid}
                  onChange={stationSelectHandler}
                >
                  {stationIds.map((y, idx) => (
                    <MenuItem key={idx} value={y}>
                      {frmtStnName(stationInfo?.[y]?.name ?? y)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ChildBox>
          </RowBox>

          <Spacing />

          <Box height={300} position="relative">
            <StnMap stationInfo={selectedStationInfo} />
            <Box position="absolute" top={24} right={24}>
              <StationInfo stationInfo={selectedStationInfo} />
            </Box>
          </Box>

          <Spacing />

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
                label="Precipitation"
                {...a11yProps(0)}
              />
              {isDev ? (
                <Tab
                  icon={<WeatherIcon name="snowflake-cold" />}
                  label="Snowfall"
                  {...a11yProps(1)}
                />
              ) : null}
              <Tab
                icon={<WeatherIcon name="thermometer" />}
                label="Temperature"
                {...a11yProps(1)}
              />
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0}>
            <Spacing size="x-large" />
            <Type variant="h4" align="center">
              Accumulated Precipitation
            </Type>
            <Fade animate={Boolean(precipResponse)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {precipResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
                <Type variant="inherit" color="inherit">
                  <em>
                    {' '}
                    (using{' '}
                    {precipResponse?.meta.valid_daterange[0][0].substr(0, 4)}-
                    {precipResponse?.meta.valid_daterange[0][1].substr(0, 4)}{' '}
                    for historical data)
                  </em>
                </Type>
              </Type>
            </Fade>
            <Box height={{xs: 400, lg: 450}} position="relative">
              <Animate
                hideUntilAnimate
                name="fadeIn"
                animate={Boolean(precipAccumDiff)}
                position="absolute"
                top={64}
                left={64}
                zIndex={2}
              >
                <Paper elevation={2} square>
                  <Box p={1}>
                    <Type variant="caption" align="center" component="header">
                      <Hidden smDown>Accumulated </Hidden>
                      <strong>{precipAccumDiff}%</strong> of Normal Average
                    </Type>
                  </Box>
                </Paper>
              </Animate>
              <PrecipAccumLine
                precipDataset={precipDataset}
                highYear={precipAccumHistHighYear}
                lowYear={precipAccumHistLowYear}
              />
            </Box>
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Monthly Summarized Precipitation
            </Type>

            <Fade animate={Boolean(precipMoSmryResponse)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {precipMoSmryResponse?.meta.name},{' '}
                {`${waterYear - 1}-${waterYear} `}
                <Type variant="inherit" color="inherit">
                  <em>
                    (using{' '}
                    {precipMoSmryResponse?.meta.valid_daterange[0][0].substr(
                      0,
                      4
                    )}
                    -
                    {precipMoSmryResponse?.meta.valid_daterange[0][1].substr(
                      0,
                      4
                    )}{' '}
                    for historical data)
                  </em>
                </Type>
              </Type>
            </Fade>
            <RowBox justifyContent="flex-end" mt={3}>
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
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Actual Precipitation
            </Type>
            <Fade animate={Boolean(precipResponse)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {precipResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
              </Type>
            </Fade>
            <Box height={{xs: 650, sm: 200, lg: 300}}>
              <PrecipCalendar precipData={precipData} waterYear={waterYear} />
            </Box>
          </TabPanel>
          {isDev ? (
            <TabPanel value={tabValue} index={1}>
              <StationSnowfall waterYear={waterYear} sid={sid} />
            </TabPanel>
          ) : null}
          <TabPanel value={tabValue} index={isDev ? 2 : 1}>
            <Spacing size="x-large" />
            <Type variant="h4" align="center">
              Observed Temperature Ranges
            </Type>

            <Fade animate={Boolean(tempHistResponse?.meta)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {tempHistResponse?.meta?.name},{' '}
                {`${waterYear - 1}-${waterYear}`}
                <Type variant="inherit" color="inherit">
                  <em>
                    {' '}
                    (using{' '}
                    {tempHistResponse?.meta?.valid_daterange[0][0].substr(0, 4)}
                    -
                    {tempHistResponse?.meta?.valid_daterange[0][1].substr(0, 4)}{' '}
                    for historical data)
                  </em>
                </Type>
              </Type>
            </Fade>
            <Box height={{xs: 400, lg: 450}} position="relative">
              <Animate
                animate={Boolean(tempResponse?.error)}
                name="fadeIn"
                hideUntilAnimate
                position="absolute"
                top="50%"
                left="50%"
                zIndex={3}
                style={{transform: 'translate(-50%, -50%)'}}
              >
                <Paper elevation={2} square>
                  <Box p={1}>
                    <Type variant="h4" align="center" color="error">
                      <strong>{toTitleCase(tempResponse?.error)}</strong>
                    </Type>
                  </Box>
                </Paper>
              </Animate>
              <TempRangeLine tempDataset={tempDataset} />
            </Box>
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Temperature Departure From Normal
            </Type>
            <Fade animate={Boolean(tempResponse?.meta)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {tempResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
              </Type>
            </Fade>
            <Box
              height={{xs: 650, sm: 200, lg: 300}}
              position="relative"
              // onMouseEnter={mouseEnterCalHandler}
              // onMouseLeave={mouseLeaveCalHandler}
            >
              <Animate
                animate={Boolean(tempResponse?.error)}
                hideUntilAnimate
                name="fadeIn"
                position="absolute"
                top="50%"
                left="50%"
                zIndex={2}
                style={{transform: 'translate(-50%, -50%)'}}
              >
                <Paper elevation={3} square>
                  <Box p={1}>
                    <Type variant="h4" align="center" color="error">
                      <strong>{toTitleCase(tempResponse?.error)}</strong>
                    </Type>
                  </Box>
                </Paper>
              </Animate>
              <TempDiffCalendar
                tempObservedDiffData={tempObservedDiffData}
                waterYear={waterYear}
              />
            </Box>
          </TabPanel>
          <Spacing size="x-large" factor={2} />
          <RowBox responsive flexSpacing={2} justifyContent="center">
            <ChildBox flex="50%" alignSelf="center">
              <Type align="center" variant="subtitle1">
                Data provided by
              </Type>
            </ChildBox>
            <ChildBox flex="50%">
              <Box mx="auto" width="100%" maxWidth="80vw">
                <a
                  href="https://www.rcc-acis.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{outline: 'none'}}
                >
                  <Image
                    src="https://imgix.cosmicjs.com/f8524320-582f-11eb-a689-4365686df91b-ACISlogo.png"
                    width={912}
                    height={117}
                    layout="responsive"
                    alt="Applied Climate Information System logo"
                  />
                </a>
              </Box>
            </ChildBox>
          </RowBox>
        </WideContainer>
      </MainBox>
    </PageLayout>
  )
}

interface TempResponse {
  meta: TempMeta
  data?: string[][]
  error?: string
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
  meta?: TempHistMeta
  smry?: string[][][]
  error?: string
}

interface TempHistMeta {
  state: string
  sids: string[]
  name: string
  valid_daterange: string[][]
}

export interface PrecipResponse {
  meta: PrecipMeta
  data: string[][]
}

interface PrecipMeta {
  state: string
  sids: string[]
  name: string
  valid_daterange: string[][]
}

export interface PrecipHistResponse {
  data: [string, [string, number]][]
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
  valid_daterange: string[][]
}

export interface CountyMetaResponse {
  meta: CountyMeta[]
}
interface CountyMeta {
  name: string
  id: string
}
interface StationMetaResponse {
  meta: StationMeta[]
}

export interface StationMeta {
  valid_daterange: string[][]
  name: string
  ll: number[]
  sids: string[]
  county: string
  state: string
  elev: number
  climdiv: string
}

function frmtStnName(name: string) {
  return toTitleCase(name, /ap|sw|\s2\s/gi)
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export function parseWaterYear(dateStr?: string) {
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
