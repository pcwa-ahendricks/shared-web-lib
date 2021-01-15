// cspell:ignore actl accum climdiv frmt perc Prcp dprt Nrml rgnl
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
  makeStyles,
  Theme,
  createStyles,
  Divider,
  Hidden,
  Grow
} from '@material-ui/core'
// import {BasicTooltip} from '@nivo/tooltip'
import round from '@lib/round'
import isNumber from 'is-number'
import {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
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
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {WaitToFade} from '@components/WaitToGrow/WaitToGrow'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type RegionalTimeFrame = 'waterYear' | 'last30Days'
type MultiStnPrcpSmryUrlBase =
  | '/api/acis/multi-stn-precip-seas-smry'
  | '/api/acis/multi-stn-precip-last30-smry'
type MultiStnSnowSmryUrlBase =
  | '/api/acis/multi-stn-snow-seas-smry'
  | '/api/acis/multi-stn-snow-last30-smry'

type LineDataProp = React.ComponentProps<typeof ResponsiveLine>['data']

const DEFAULT_REGIONAL_TIME_FRAME = 'waterYear' as RegionalTimeFrame

const stationIds = [
  '040897 2',
  '040383 2',
  '041912 2',
  '043134 2',
  '043491 2',
  '048758 2',
  '043891 2'
] as const
type StationId = typeof stationIds[number]

type StationInfo =
  | Partial<
      {
        [key in StationId]: StationMeta
      }
    >
  | undefined

const prcNrmlPrcpImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPNormCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPNormCA.png'
} as const

const dprtNrmlPrecipImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPDeptCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPDeptCA.png'
} as const

const precipImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPDataCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPDataCA.png'
} as const

const multiStnPrcpSmryUrls = {
  waterYear: '/api/acis/multi-stn-precip-seas-smry',
  last30Days: '/api/acis/multi-stn-precip-last30-smry'
} as const
const multiStnSnowSmryUrls = {
  waterYear: '/api/acis/multi-stn-snow-seas-smry',
  last30Days: '/api/acis/multi-stn-snow-last30-smry'
} as const

const refreshInterval = 1000 * 60 * 60 * 6 // 6 hr interval.

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mediaDialogImg: {
      borderWidth: '1px !important',
      borderColor: `${theme.palette.grey[300]} !important`,
      borderStyle: 'solid !important',
      [theme.breakpoints.up('sm')]: {
        cursor: 'pointer'
      }
    }
  })
)

export default function SeasonRecapPage() {
  const classes = useStyles()

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
  const prevWaterYear = waterYear - 1

  const [regionalTimeFrame, setRegionalTimeFrame] = useState<RegionalTimeFrame>(
    DEFAULT_REGIONAL_TIME_FRAME
  )

  const rgnlTmFrmHandler = useCallback((_e, timeFrame: RegionalTimeFrame) => {
    // Enforce a value (ie. don't allow un-select)
    if (timeFrame !== null) {
      setRegionalTimeFrame(timeFrame)
    }
  }, [])

  const [percNormalPrecipSrc, setPercNormalPrecipSrc] = useState<string>(
    prcNrmlPrcpImgSrc[regionalTimeFrame]
  )
  const [departNormalPrecipSrc, setDepartNormalPrecipSrc] = useState<string>(
    dprtNrmlPrecipImgSrc[regionalTimeFrame]
  )
  const [precipSrc, setPrecipSrc] = useState<string>(
    precipImgSrc[regionalTimeFrame]
  )

  const multiStnQs = stringify({waterYear}, true)
  const [
    multiStnPrcpSmryUrlBase,
    setMultiStnPrcpSmryUrlBase
  ] = useState<MultiStnPrcpSmryUrlBase>(multiStnPrcpSmryUrls[regionalTimeFrame])
  const {data: multiStnPrecipSmryRes} = useSWR<MultiStnSmryResponse>(
    `${multiStnPrcpSmryUrlBase}${multiStnQs}`
  )
  const multiStnPrecipSmryData = useMemo(() => {
    // Only return station data for stations that have data for all three values
    const filtered = multiStnPrecipSmryRes?.data.filter((d) =>
      d.data.every((v) => isNumber(v))
    )
    const mapped = filtered?.map((d) => ({
      ...d,
      meta: {
        ...d.meta,
        county:
          countyResponse?.meta.find((c) => c.id === d.meta.county)?.name ?? ''
      },
      data: [
        ...d.data.map((d) => parseFloat(d)),
        (parseFloat(d.data[0]) / parseFloat(d.data[1])) * 100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnPrecipSmryRes, countyResponse])
  console.log('multiStnPrecipSmryRes', multiStnPrecipSmryRes)
  console.log('multiStnPrecipSmryData', multiStnPrecipSmryData)

  const multiStnPrecipSmryPerc = useMemo(
    () => multiStnPrecipSmryData.map((d) => d.data[3]),
    [multiStnPrecipSmryData]
  )
  const precipPerc = useMemo(
    () =>
      multiStnPrecipSmryPerc.reduce((prev, curr) => {
        const a = prev + curr
        return a
      }, 0) / multiStnPrecipSmryPerc.length,
    [multiStnPrecipSmryPerc]
  )
  console.log('precip average: ', precipPerc)

  const [
    multiStnSnowSmryUrlBase,
    setMultiStnSnowSmryUrlBase
  ] = useState<MultiStnSnowSmryUrlBase>(multiStnSnowSmryUrls[regionalTimeFrame])
  const {data: multiStnSnowSmryRes} = useSWR<MultiStnSmryResponse>(
    `${multiStnSnowSmryUrlBase}${multiStnQs}`
  )
  const multiStnSnowSmryData = useMemo(() => {
    // Only return station data for stations that have data for all three values
    const filtered = multiStnSnowSmryRes?.data.filter((d) =>
      d.data.every((v) => isNumber(v))
    )
    const mapped = filtered?.map((d) => ({
      ...d,
      meta: {
        ...d.meta,
        county:
          countyResponse?.meta.find((c) => c.id === d.meta.county)?.name ?? ''
      },
      data: [
        ...d.data.map((d) => parseFloat(d)),
        (parseFloat(d.data[0]) / parseFloat(d.data[1])) * 100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnSnowSmryRes, countyResponse])
  console.log('multiStnSnowSmryData', multiStnSnowSmryData)

  const multiStnSnowSmryPerc = useMemo(
    () => multiStnSnowSmryData.map((d) => d.data[3]),
    [multiStnSnowSmryData]
  )
  const snowPerc = useMemo(
    () =>
      multiStnSnowSmryPerc.reduce((prev, curr) => {
        const a = prev + curr
        return a
      }, 0) / multiStnSnowSmryPerc.length,
    [multiStnSnowSmryPerc]
  )
  console.log('snow average: ', snowPerc)

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
  // console.log(stationInfo)
  const selectedStationInfo = useMemo(
    () => (stationInfo ? stationInfo[sid] : null),
    [sid, stationInfo]
  )

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
  // console.log(precipResponse)

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

  useEffect(() => {
    setPercNormalPrecipSrc(prcNrmlPrcpImgSrc[regionalTimeFrame])
    setDepartNormalPrecipSrc(dprtNrmlPrecipImgSrc[regionalTimeFrame])
    setPrecipSrc(precipImgSrc[regionalTimeFrame])
    setMultiStnPrcpSmryUrlBase(multiStnPrcpSmryUrls[regionalTimeFrame])
    setMultiStnSnowSmryUrlBase(multiStnSnowSmryUrls[regionalTimeFrame])
  }, [regionalTimeFrame])

  return (
    <PageLayout title="Page Template" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle title="Season Recap" />
          <Spacing />
          <Type variant="h2" color="primary">
            Regional Conditions
          </Type>
          <Spacing />
          <Box>
            <ToggleButtonGroup
              value={regionalTimeFrame}
              exclusive
              onChange={rgnlTmFrmHandler}
              aria-label="regional time frame"
            >
              <ToggleButton value="last30Days" aria-label="last 30 days">
                Last 30 days
              </ToggleButton>
              <ToggleButton value="waterYear" aria-label="current water year">
                Current Water Year
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Spacing />
          <Type variant="h4" gutterBottom>
            Precipitation Maps
          </Type>
          <RowBox flexSpacing={2}>
            <ChildBox flex="33.33%">
              <MediaDialogOnClick
                mediaName="Actual Precipitation"
                mediaUrl={precipSrc}
                mediaExt="png"
              >
                <Image
                  src={precipSrc}
                  layout="responsive"
                  height={850}
                  width={1100}
                  alt="Actual Precipitation for California"
                  className={classes.mediaDialogImg}
                />
              </MediaDialogOnClick>
              <ColumnBox mt={1} alignItems="center">
                <Type variant="caption">Actual Precipitation</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="33.33%">
              <MediaDialogOnClick
                mediaName="Departure from Normal"
                mediaUrl={departNormalPrecipSrc}
                mediaExt="png"
              >
                <Image
                  src={departNormalPrecipSrc}
                  layout="responsive"
                  height={850}
                  width={1100}
                  alt="Departure from Normal Precipitation for California"
                  className={classes.mediaDialogImg}
                />
              </MediaDialogOnClick>
              <ColumnBox mt={1} alignItems="center">
                <Type variant="caption">Departure from Normal</Type>
              </ColumnBox>
            </ChildBox>
            <ChildBox flex="33.33%">
              <MediaDialogOnClick
                mediaName="Percent of Normal"
                mediaUrl={percNormalPrecipSrc}
                mediaExt="png"
              >
                <Image
                  src={percNormalPrecipSrc}
                  layout="responsive"
                  height={850}
                  width={1100}
                  alt="Percent of Normal Precipitation for California"
                  className={classes.mediaDialogImg}
                />
              </MediaDialogOnClick>
              <ColumnBox mt={1} alignItems="center">
                <Type variant="caption">Percent of Normal</Type>
              </ColumnBox>
            </ChildBox>
          </RowBox>

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

          <Box height={300}>
            <StnMap stationInfo={selectedStationInfo} />
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
                label="PRECIPITATION"
                {...a11yProps(0)}
              />
              <Tab
                icon={<WeatherIcon name="thermometer" />}
                label="TEMPERATURE"
                {...a11yProps(1)}
              />
            </Tabs>
          </Paper>
          <TabPanel value={tabValue} index={0}>
            <Spacing size="x-large" />
            <Type variant="h4" align="center">
              Accumulated Precipitation
            </Type>
            <Grow in={Boolean(precipResponse)}>
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
            </Grow>
            <Box height={{xs: 400, lg: 450}} position="relative">
              <WaitToFade isIn={Boolean(precipAccumDiff)}>
                <Box position="absolute" top={64} left={64} zIndex={2}>
                  <Paper elevation={2} square>
                    <Box p={1}>
                      <Type variant="caption" align="center" component="header">
                        <Hidden smDown>Accumulated </Hidden>
                        <strong>{precipAccumDiff}%</strong> of Normal Average
                      </Type>
                    </Box>
                  </Paper>
                </Box>
              </WaitToFade>
              <PrecipAccumLine precipDataset={precipDataset} />
            </Box>
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Monthly Summarized Precipitation
            </Type>

            <Grow in={Boolean(precipResponse)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {precipResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
              </Type>
            </Grow>
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
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Actual Precipitation
            </Type>
            <Grow in={Boolean(precipResponse)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {precipResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
              </Type>
            </Grow>
            <Box height={{xs: 200, lg: 300}}>
              <PrecipCalendar
                precipData={precipData}
                waterYear={waterYear}
                prevWaterYear={prevWaterYear}
              />
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Spacing size="x-large" />
            <Type variant="h4" align="center">
              Observed Temperature Ranges
            </Type>

            <Grow in={Boolean(tempHistResponse?.meta)}>
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
            </Grow>
            <Box height={{xs: 400, lg: 450}} position="relative">
              <WaitToFade isIn={Boolean(tempResponse?.error)}>
                <Box
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
                </Box>
              </WaitToFade>
              <TempRangeLine tempDataset={tempDataset} />
            </Box>
            <Spacing size="x-large">
              <Divider />
            </Spacing>
            <Type variant="h4" align="center">
              Temperature Departure From Normal
            </Type>
            <Grow in={Boolean(tempResponse?.meta)}>
              <Type
                variant="caption"
                align="center"
                color="textSecondary"
                component="header"
              >
                {tempResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
              </Type>
            </Grow>
            <Box
              height={{xs: 200, lg: 300}}
              position="relative"
              // onMouseEnter={mouseEnterCalHandler}
              // onMouseLeave={mouseLeaveCalHandler}
            >
              <WaitToFade isIn={Boolean(tempResponse?.error)}>
                <Box
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
                </Box>
              </WaitToFade>
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

interface CountyMetaResponse {
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

interface MultiStnSmryResponse {
  data: MultiStnSmryDatum[]
}

interface MultiStnSmryDatum {
  meta: MultiStnSmryMeta
  data: string[]
}

interface MultiStnSmryMeta {
  name: string
  ll: number[]
  sids: string[]
  county: string
  state: string
  elev: number
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
