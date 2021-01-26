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
  CircularProgress,
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
  Grow,
  Link,
  Popover
} from '@material-ui/core'
// import {BasicTooltip} from '@nivo/tooltip'
import round from '@lib/round'
import isNumber from 'is-number'
import FlexBox, {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
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
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import {grey} from '@material-ui/core/colors'
import StationInfo from '@components/season-recap/StationInfo'
import SnowfallAccumLine from '@components/season-recap/SnowAccumLine'
const isDev = process.env.NODE_ENV === 'development'

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

type RegionalTimeFrame = 'waterYear' | 'last30Days' | 'last7Days'

type MultiStnPrcpSmryUrlBase =
  | '/api/acis/multi-stn-precip-seas-smry'
  | '/api/acis/multi-stn-precip-last30-smry'
  | '/api/acis/multi-stn-precip-last7-smry'
type MultiStnSnowSmryUrlBase =
  | '/api/acis/multi-stn-snow-seas-smry'
  | '/api/acis/multi-stn-snow-last30-smry'
  | '/api/acis/multi-stn-snow-last7-smry'
type MultiStnMxTempSmryUrlBase =
  | '/api/acis/multi-stn-mxtemp-seas-smry'
  | '/api/acis/multi-stn-mxtemp-last30-smry'
  | '/api/acis/multi-stn-mxtemp-last7-smry'

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
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPNormCA.png',
  last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dPNormCA.png'
} as const

const dprtNrmlPrecipImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPDeptCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPDeptCA.png',
  last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dPDeptCA.png'
} as const

const precipImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPDataCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPDataCA.png',
  last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dPDataCA.png'
} as const

const tempDepartImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterTDeptCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dTDeptCA.png',
  last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dTDeptCA.png'
} as const

const multiStnPrcpSmryUrls = {
  waterYear: '/api/acis/multi-stn-precip-seas-smry',
  last30Days: '/api/acis/multi-stn-precip-last30-smry',
  last7Days: '/api/acis/multi-stn-precip-last7-smry'
} as const
const multiStnSnowSmryUrls = {
  waterYear: '/api/acis/multi-stn-snow-seas-smry',
  last30Days: '/api/acis/multi-stn-snow-last30-smry',
  last7Days: '/api/acis/multi-stn-snow-last7-smry'
} as const
const multiStnMxTempSmryUrls = {
  waterYear: '/api/acis/multi-stn-mxtemp-seas-smry',
  last30Days: '/api/acis/multi-stn-mxtemp-last30-smry',
  last7Days: '/api/acis/multi-stn-mxtemp-last7-smry'
} as const

const refreshInterval = 1000 * 60 * 60 * 6 // 6 hr interval.

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none'
    },
    paper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.common.white
    },
    mediaDialogImg: {
      borderWidth: '1px !important',
      borderColor: `${theme.palette.grey[300]} !important`,
      borderStyle: 'solid !important',
      [theme.breakpoints.up('sm')]: {
        cursor: 'pointer'
      }
    },
    regionalStat: {
      fontSize: 36
    },
    regionalStatSub: {
      fontSize: 24
    },
    hasPopover: {
      cursor: 'pointer',
      whiteSpace: 'nowrap'
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
  const [regionalWaterYear] = useState(getYear(new Date()))
  const [sid, setSid] = useState<StationId>('040897 2')

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
  const [tempDepartSrc, setTempDepartSrc] = useState<string>(
    tempDepartImgSrc[regionalTimeFrame]
  )

  const multiStnQs = stringify({waterYear: regionalWaterYear}, true)

  /* Regional Precip */
  const [
    multiStnPrcpSmryUrlBase,
    setMultiStnPrcpSmryUrlBase
  ] = useState<MultiStnPrcpSmryUrlBase>(multiStnPrcpSmryUrls[regionalTimeFrame])
  const {
    data: multiStnPrecipSmryRes,
    isValidating: multiStnPrecipSmryResValidating
  } = useSWR<MultiStnSmryResponse>(`${multiStnPrcpSmryUrlBase}${multiStnQs}`)
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
        // Don't divide by zero
        (parseFloat(d.data[0]) /
          (parseFloat(d.data[1]) === 0 ? 0.0000001 : parseFloat(d.data[1]))) *
          100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnPrecipSmryRes, countyResponse])

  const multiStnPrecipSmryStns = multiStnPrecipSmryData
    .map((d) => d.meta.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  const multiStnPrecipSmryCounties = multiStnPrecipSmryData
    .map((d) => d.meta.county)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

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

  /* Regional Snow */
  const [
    multiStnSnowSmryUrlBase,
    setMultiStnSnowSmryUrlBase
  ] = useState<MultiStnSnowSmryUrlBase>(multiStnSnowSmryUrls[regionalTimeFrame])
  const {
    data: multiStnSnowSmryRes,
    isValidating: multiStnSnowSmryResValidating
  } = useSWR<MultiStnSmryResponse>(`${multiStnSnowSmryUrlBase}${multiStnQs}`)

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
        (parseFloat(d.data[0]) /
          // Don't divide by zero
          (parseFloat(d.data[1]) === 0 ? 0.0000001 : parseFloat(d.data[1]))) *
          100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnSnowSmryRes, countyResponse])
  console.log(multiStnSnowSmryData)

  const multiStnSnowSmryStns = multiStnSnowSmryData
    .map((d) => d.meta.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  const multiStnSnowSmryCounties = multiStnSnowSmryData
    .map((d) => d.meta.county)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

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

  /* Regional Max Temp */
  const [
    multiStnMxTempSmryUrlBase,
    setMultiStnMxTempSmryUrlBase
  ] = useState<MultiStnMxTempSmryUrlBase>(
    multiStnMxTempSmryUrls[regionalTimeFrame]
  )
  const {
    data: multiStnMxTempSmryRes,
    isValidating: multiStnMxTempSmryResValidating
  } = useSWR<MultiStnSmryResponse>(`${multiStnMxTempSmryUrlBase}${multiStnQs}`)
  const multiStnMxTempSmryData = useMemo(() => {
    // Only return station data for stations that have data for all three values
    const filtered = multiStnMxTempSmryRes?.data.filter((d) =>
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
        (parseFloat(d.data[0]) /
          // Don't divide by zero
          (parseFloat(d.data[1]) === 0 ? 0.0000001 : parseFloat(d.data[1]))) *
          100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnMxTempSmryRes, countyResponse])

  const multiStnMxTempSmryStns = multiStnMxTempSmryData
    .map((d) => d.meta.name)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
  const multiStnMxTempSmryCounties = multiStnMxTempSmryData
    .map((d) => d.meta.county)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort()
    .reverse()

  const multiStnMxTempSmryPerc = useMemo(
    () => multiStnMxTempSmryData.map((d) => d.data[3]),
    [multiStnMxTempSmryData]
  )
  const multiStnMxTempSmryDprt = useMemo(
    () => multiStnMxTempSmryData.map((d) => d.data[2]),
    [multiStnMxTempSmryData]
  )
  const mxTempPerc = useMemo(
    () =>
      multiStnMxTempSmryPerc.reduce((prev, curr) => {
        const a = prev + curr
        return a
      }, 0) / multiStnMxTempSmryPerc.length,
    [multiStnMxTempSmryPerc]
  )
  const mxTempDepart = useMemo(
    () =>
      multiStnMxTempSmryDprt.reduce((prev, curr) => {
        const a = prev + curr
        return a
      }, 0) / multiStnMxTempSmryDprt.length,
    [multiStnMxTempSmryDprt]
  )

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
  const {data: snowfallResponse} = useSWR<PrecipResponse>(
    `/api/acis/snowfall${qs}`,
    {refreshInterval}
  )
  const {data: snowfallHistResponse} = useSWR<PrecipHistResponse>(
    `/api/acis/snowfall-hist${qs}`,
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

  const snowfallAccumData = useMemo(
    () => ({
      id: 'Accumulated Snowfall',
      data: (
        snowfallResponse?.data.map((i) => ({
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
    [snowfallResponse]
  )

  const snowfallData = useMemo(
    () =>
      snowfallResponse?.data.map((i) => ({
        day: i[0],
        // Trace values are effectively 0.
        value: i[1]?.toLowerCase() === 't' ? 0 : parseFloat(i[1] ?? '')
      })) ?? [],
    [snowfallResponse]
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

  const snowfallAccumHistHighYear = useMemo(() => {
    const highYearDateStr = snowfallHistResponse?.data.reduce((prev, curr) => {
      const prevValue = parseFloat(prev?.[1]?.[0])
      const currValue = parseFloat(curr[1][0])
      if (!isNumber(prevValue)) {
        return curr
      }
      return isNumber(currValue) && currValue > prevValue ? curr : prev
    })[0]
    return parseWaterYear(highYearDateStr)
  }, [snowfallHistResponse])

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
  const qsSnowfallHigh = stringify(
    {sid, waterYear: snowfallAccumHistHighYear},
    true
  )
  const {data: snowfallAccumHistHighResponse} = useSWR<PrecipResponse>(
    snowfallAccumHistHighYear
      ? `/api/acis/snowfall-hist-yr${qsSnowfallHigh}`
      : null,
    {refreshInterval}
  )

  const snowfallAccumHistHighData = useMemo(
    () => ({
      id: 'Recorded High',
      data: (
        snowfallAccumHistHighResponse?.data.map((i, idx) => ({
          // x: i[0], // High date
          x: snowfallResponse?.data[idx]?.[0] ?? '',
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
    [snowfallAccumHistHighResponse, snowfallResponse]
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

  const snowfallAccumHistLowYear = useMemo(() => {
    const lowYearDateStr = snowfallHistResponse?.data.reduce((prev, curr) => {
      const prevValue = parseFloat(prev?.[1]?.[0])
      const currValue = parseFloat(curr[1][0])
      if (!isNumber(prevValue)) {
        return curr
      }
      return isNumber(currValue) && currValue < prevValue ? curr : prev
    })[0]
    return parseWaterYear(lowYearDateStr)
  }, [snowfallHistResponse])

  const qsPrecipLow = stringify({sid, waterYear: precipAccumHistLowYear}, true)
  const {data: precipAccumHistLowResponse} = useSWR<PrecipResponse>(
    precipAccumHistLowYear ? `/api/acis/precip-hist-yr${qsPrecipLow}` : null,
    {refreshInterval}
  )
  const qsSnowfallLow = stringify(
    {sid, waterYear: snowfallAccumHistLowYear},
    true
  )
  const {data: snowfallAccumHistLowResponse} = useSWR<PrecipResponse>(
    snowfallAccumHistLowYear
      ? `/api/acis/snowfall-hist-yr${qsSnowfallLow}`
      : null,
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
  const snowfallAccumHistLowData = useMemo(
    () => ({
      id: 'Recorded Low',
      data: (
        snowfallAccumHistLowResponse?.data.map((i, idx) => ({
          // x: i[0],
          x: snowfallResponse?.data[idx]?.[0] ?? '',
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
    [snowfallAccumHistLowResponse, snowfallResponse]
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
  const snowfallNormalAccumData = useMemo(
    () => ({
      id: 'Average Accum. Snowfall',
      data: (
        snowfallResponse?.data.map((i) => ({
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
    [snowfallResponse]
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

  const snowfallAccumDiff = useMemo(() => {
    const snowfallAccum = snowfallAccumData.data.slice(-1)[0]?.y ?? null
    const snowfallAccumNormal =
      snowfallNormalAccumData.data.slice(-1)[0]?.y ?? null

    return isNumber(snowfallAccum) &&
      isNumber(snowfallAccumNormal) &&
      snowfallAccumNormal !== 0 // Don't show infinity values when Normal data is not present
      ? round((snowfallAccum / snowfallAccumNormal) * 100, 0)
      : null
  }, [snowfallAccumData, snowfallNormalAccumData])

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

  const [snowfallDataset, setSnowfallDataset] = useState<LineDataProp>([])
  useEffect(() => {
    setTimeout(() => {
      setSnowfallDataset([
        snowfallAccumHistLowData,
        snowfallAccumHistHighData,
        snowfallNormalAccumData,
        snowfallAccumData
      ])
    })
  }, [
    snowfallAccumData,
    snowfallNormalAccumData,
    snowfallAccumHistHighData,
    snowfallAccumHistLowData
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
    setTempDepartSrc(tempDepartImgSrc[regionalTimeFrame])
    setMultiStnPrcpSmryUrlBase(multiStnPrcpSmryUrls[regionalTimeFrame])
    setMultiStnSnowSmryUrlBase(multiStnSnowSmryUrls[regionalTimeFrame])
    setMultiStnMxTempSmryUrlBase(multiStnMxTempSmryUrls[regionalTimeFrame])
  }, [regionalTimeFrame])

  const [regSnowStnAnchorEl, setRegSnowStnAnchorEl] = useState(null)

  const handleRegSnowStnPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegSnowStnAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegSnowStnPopoverClose = useCallback(() => {
    setRegSnowStnAnchorEl(null)
  }, [])

  const regSnowStnPopoverOpen = Boolean(regSnowStnAnchorEl)

  const [regSnowCntyAnchorEl, setRegSnowCntyAnchorEl] = useState(null)

  const handleRegSnowCntyPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegSnowCntyAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegSnowCntyPopoverClose = useCallback(() => {
    setRegSnowCntyAnchorEl(null)
  }, [])

  const regSnowCntyPopoverOpen = Boolean(regSnowCntyAnchorEl)

  const [regPrecipStnAnchorEl, setRegPrecipStnAnchorEl] = useState(null)

  const handleRegPrecipStnPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegPrecipStnAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegPrecipStnPopoverClose = useCallback(() => {
    setRegPrecipStnAnchorEl(null)
  }, [])

  const regPrecipStnPopoverOpen = Boolean(regPrecipStnAnchorEl)

  const [regPrecipCntyAnchorEl, setRegPrecipCntyAnchorEl] = useState(null)

  const handleRegPrecipCntyPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegPrecipCntyAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegPrecipCntyPopoverClose = useCallback(() => {
    setRegPrecipCntyAnchorEl(null)
  }, [])

  const regPrecipCntyPopoverOpen = Boolean(regPrecipCntyAnchorEl)

  const [regTempStnAnchorEl, setRegTempStnAnchorEl] = useState(null)

  const handleRegTempStnPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegTempStnAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegTempStnPopoverClose = useCallback(() => {
    setRegTempStnAnchorEl(null)
  }, [])

  const regTempStnPopoverOpen = Boolean(regTempStnAnchorEl)

  const [regTempCntyAnchorEl, setRegTempCntyAnchorEl] = useState(null)

  const handleRegTempCntyPopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      setRegTempCntyAnchorEl(event.currentTarget as any)
    },
    []
  )

  const handleRegTempCntyPopoverClose = useCallback(() => {
    setRegTempCntyAnchorEl(null)
  }, [])

  const regTempCntyPopoverOpen = Boolean(regTempCntyAnchorEl)

  const AbsSpinner = useCallback(
    () => (
      <ChildBox
        position="absolute"
        left="50%"
        top="50%"
        style={{transform: 'translate(-50%, -50%)'}}
      >
        <CircularProgress color="secondary" />
      </ChildBox>
    ),
    []
  )

  return (
    <PageLayout title="Weather & Climate" waterSurface>
      <MainBox>
        <WideContainer>
          <PageTitle subtitle="Season Recap" title="Weather & Climate" />
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
              <ToggleButton value="last7Days" aria-label="last 7 days">
                Last 7 days
              </ToggleButton>
              <ToggleButton value="last30Days" aria-label="last 30 days">
                Last 30 days
              </ToggleButton>
              <ToggleButton value="waterYear" aria-label="current water year">
                Current Water Year
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Spacing />
          {/* <Type align="center" variant="body1">
            <em>The greater region has received</em>
          </Type> */}
          <Paper square={false} elevation={0} component={FlexBox}>
            <RowBox
              responsive
              flexSpacing={4}
              justifyContent="space-around"
              pt={1}
              px={2}
              pb={3}
            >
              <ColumnBox child>
                <RowBox p={1}>
                  <ChildBox flex="auto">
                    <Type variant="body1" align="center" style={{fontSize: 20}}>
                      <em>
                        In the{' '}
                        <StrongEmphasis variant="inherit" color="primary">
                          {regionalTimeFrame === 'waterYear'
                            ? 'current water year'
                            : regionalTimeFrame === 'last30Days'
                            ? 'last 30 days'
                            : regionalTimeFrame === 'last7Days'
                            ? 'last 7 days'
                            : ''}
                        </StrongEmphasis>{' '}
                        the greater region has received...
                      </em>
                    </Type>
                  </ChildBox>
                </RowBox>
                <RowBox>
                  <ColumnBox child alignItems="center" position="relative">
                    {multiStnPrecipSmryResValidating ? <AbsSpinner /> : null}
                    <Grow in={isNumber(precipPerc)}>
                      <ColumnBox child alignItems="center">
                        <Type
                          variant="body1"
                          className={classes.regionalStat}
                          align="center"
                        >
                          {isNumber(precipPerc)
                            ? `${round(precipPerc, 0)}%`
                            : null}
                        </Type>
                        <Type align="center"> of the Average Rainfall</Type>
                        <Box maxWidth="80%">
                          <Type align="center" variant="body2">
                            Using data from{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regPrecipStnPopoverOpen
                                  ? 'regional-precip-stations-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegPrecipStnPopoverOpen}
                              onMouseLeave={handleRegPrecipStnPopoverClose}
                            >
                              <u>{multiStnPrecipSmryStns.length} stations</u>
                            </Type>{' '}
                            <Popover
                              id="regional-precip-stations-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regPrecipStnPopoverOpen}
                              anchorEl={regPrecipStnAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegPrecipStnPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Stations include:</Type>
                                {multiStnPrecipSmryStns.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>{' '}
                            in{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regPrecipCntyPopoverOpen
                                  ? 'regional-precip-counties-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegPrecipCntyPopoverOpen}
                              onMouseLeave={handleRegPrecipCntyPopoverClose}
                            >
                              <u>
                                {multiStnPrecipSmryCounties.length} count
                                {multiStnPrecipSmryCounties.length > 1
                                  ? 'ies'
                                  : 'y'}
                              </u>
                            </Type>
                            <Popover
                              id="regional-precip-counties-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regPrecipCntyPopoverOpen}
                              anchorEl={regPrecipCntyAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegPrecipCntyPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Counties include:</Type>
                                {multiStnPrecipSmryCounties.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>
                            .
                          </Type>
                        </Box>
                      </ColumnBox>
                    </Grow>
                  </ColumnBox>
                  <ColumnBox child alignItems="center" position="relative">
                    {multiStnSnowSmryResValidating ? <AbsSpinner /> : null}
                    <Grow in={isNumber(snowPerc)}>
                      <ColumnBox child alignItems="center">
                        <Type variant="body1" className={classes.regionalStat}>
                          {isNumber(snowPerc) ? `${round(snowPerc, 0)}%` : null}
                        </Type>
                        <Type> of the Average Snowfall</Type>
                        <Box maxWidth="80%">
                          <Type align="center" variant="body2">
                            Using data from{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regSnowStnPopoverOpen
                                  ? 'regional-snowfall-stations-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegSnowStnPopoverOpen}
                              onMouseLeave={handleRegSnowStnPopoverClose}
                            >
                              <u>{multiStnSnowSmryStns.length} stations</u>
                            </Type>
                            <Popover
                              id="regional-snowfall-stations-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regSnowStnPopoverOpen}
                              anchorEl={regSnowStnAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegSnowStnPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Stations include:</Type>
                                {multiStnSnowSmryStns.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>{' '}
                            in{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regSnowCntyPopoverOpen
                                  ? 'regional-snowfall-counties-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegSnowCntyPopoverOpen}
                              onMouseLeave={handleRegSnowCntyPopoverClose}
                            >
                              <u>
                                {multiStnSnowSmryCounties.length} count
                                {multiStnSnowSmryCounties.length > 1
                                  ? 'ies'
                                  : 'y'}
                              </u>
                            </Type>
                            .
                            <Popover
                              id="regional-snowfall-counties-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regSnowCntyPopoverOpen}
                              anchorEl={regSnowCntyAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegSnowCntyPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Counties include:</Type>
                                {multiStnSnowSmryCounties.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>
                          </Type>
                        </Box>
                      </ColumnBox>
                    </Grow>
                  </ColumnBox>
                </RowBox>
              </ColumnBox>
              <ColumnBox child>
                <RowBox p={1}>
                  <ChildBox flex="auto">
                    <Type variant="body1" align="center" style={{fontSize: 20}}>
                      <em>and has been...</em>
                    </Type>
                  </ChildBox>
                </RowBox>
                <RowBox>
                  <ColumnBox child alignItems="center" position="relative">
                    {multiStnMxTempSmryResValidating ? <AbsSpinner /> : null}
                    <Grow in={isNumber(mxTempDepart)}>
                      <ColumnBox child alignItems="center">
                        <Box position="relative">
                          <Type
                            variant="body1"
                            className={classes.regionalStat}
                            component="header"
                          >
                            {isNumber(mxTempDepart)
                              ? Math.abs(round(mxTempDepart, 1))
                              : null}
                            <Box
                              component="span"
                              position="absolute"
                              top={8}
                              right={-34}
                            >
                              <WeatherIcon
                                name="fahrenheit"
                                style={{
                                  fontSize: 32,
                                  color: grey[800],
                                  verticalAlign: 'top'
                                }}
                              />
                            </Box>
                          </Type>
                        </Box>
                        <Type
                          variant="body1"
                          className={classes.regionalStatSub}
                          component="header"
                          style={{marginTop: -16}}
                        >
                          {isNumber(mxTempDepart)
                            ? mxTempDepart > 0
                              ? 'warmer'
                              : 'cooler'
                            : null}
                        </Type>
                        <Type>Daily on Average</Type>
                        <Type>
                          <em>
                            {isNumber(mxTempPerc) ? (
                              <>
                                (or {Math.abs(100 - round(mxTempPerc, 0))}%{' '}
                                {mxTempPerc > 100 ? 'warmer' : 'cooler'})
                              </>
                            ) : null}
                          </em>
                        </Type>
                        <Box maxWidth="80%">
                          <Type align="center" variant="body2">
                            Using daily max temperature data from{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regTempStnPopoverOpen
                                  ? 'regional-temp-stations-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegTempStnPopoverOpen}
                              onMouseLeave={handleRegTempStnPopoverClose}
                            >
                              <u>{multiStnMxTempSmryStns.length} stations</u>
                            </Type>{' '}
                            <Popover
                              id="regional-temp-stations-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regTempStnPopoverOpen}
                              anchorEl={regTempStnAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegTempStnPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Stations include:</Type>
                                {multiStnMxTempSmryStns.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>{' '}
                            in{' '}
                            <Type
                              variant="inherit"
                              className={classes.hasPopover}
                              aria-owns={
                                regTempCntyPopoverOpen
                                  ? 'regional-temp-counties-popover'
                                  : undefined
                              }
                              aria-haspopup="true"
                              onMouseEnter={handleRegTempCntyPopoverOpen}
                              onMouseLeave={handleRegTempCntyPopoverClose}
                            >
                              <u>
                                {multiStnMxTempSmryCounties.length} count
                                {multiStnMxTempSmryCounties.length > 1
                                  ? 'ies'
                                  : 'y'}
                              </u>
                            </Type>
                            <Popover
                              id="regional-temp-counties-popover"
                              className={classes.popover}
                              classes={{
                                paper: classes.paper
                              }}
                              open={regTempCntyPopoverOpen}
                              anchorEl={regTempCntyAnchorEl}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                              }}
                              onClose={handleRegTempCntyPopoverClose}
                              disableRestoreFocus
                            >
                              <>
                                <Type variant="body2">Counties include:</Type>
                                {multiStnMxTempSmryCounties.map((s) => (
                                  <Type key={s} variant="body1">
                                    {toTitleCase(s)}
                                  </Type>
                                ))}
                              </>
                            </Popover>
                            .
                          </Type>
                        </Box>
                      </ColumnBox>
                    </Grow>
                  </ColumnBox>
                </RowBox>
              </ColumnBox>
            </RowBox>
          </Paper>
          <Spacing size="large" />
          {/* <RowBox justifyContent="space-between"> */}
          <Type variant="h4" gutterBottom>
            Precipitation Maps
          </Type>
          {/* </RowBox> */}
          <RowBox responsive flexSpacing={2}>
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
          <Spacing size="large" />
          <Type variant="h4" gutterBottom>
            Temperature Maps
          </Type>
          {/* </RowBox> */}
          <RowBox responsive flexSpacing={2}>
            <ChildBox flex="0 1 33.33%">
              <MediaDialogOnClick
                mediaName="Temperature Departure"
                mediaUrl={tempDepartSrc}
                mediaExt="png"
              >
                <Image
                  src={tempDepartSrc}
                  layout="responsive"
                  height={850}
                  width={1100}
                  alt="Departure from Normal Temperature for California"
                  className={classes.mediaDialogImg}
                />
              </MediaDialogOnClick>
              <ColumnBox mt={1} alignItems="center">
                <Type variant="caption">Departure from Normal Temperature</Type>
              </ColumnBox>
            </ChildBox>
          </RowBox>
          <Spacing size="large" />
          <Type variant="caption" color="textSecondary">
            <em>
              Climate Maps are provided by{' '}
              <Link
                style={{outline: 'none'}}
                variant="inherit"
                href="https://hprcc.unl.edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                High Plains Regional Climate Center
              </Link>
            </em>
          </Type>

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

            <Grow in={Boolean(precipMoSmryResponse)}>
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
            </Grow>
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
            <Box height={{xs: 650, sm: 200, lg: 300}}>
              <PrecipCalendar precipData={precipData} waterYear={waterYear} />
            </Box>
          </TabPanel>
          {isDev ? (
            <TabPanel value={tabValue} index={1}>
              <Spacing size="x-large" />
              <Type variant="h4" align="center">
                Accumulated Snowfall
              </Type>{' '}
              <Grow in={Boolean(snowfallResponse)}>
                <Type
                  variant="caption"
                  align="center"
                  color="textSecondary"
                  component="header"
                >
                  {snowfallResponse?.meta.name},{' '}
                  {`${waterYear - 1}-${waterYear}`}
                  <Type variant="inherit" color="inherit">
                    <em>
                      {' '}
                      (using{' '}
                      {snowfallResponse?.meta.valid_daterange[0][0].substr(
                        0,
                        4
                      )}
                      -
                      {snowfallResponse?.meta.valid_daterange[0][1].substr(
                        0,
                        4
                      )}{' '}
                      for historical data)
                    </em>
                  </Type>
                </Type>
              </Grow>
              <Box height={{xs: 400, lg: 450}} position="relative">
                <WaitToFade isIn={Boolean(snowfallAccumDiff)}>
                  <Box position="absolute" top={64} left={64} zIndex={2}>
                    <Paper elevation={2} square>
                      <Box p={1}>
                        <Type
                          variant="caption"
                          align="center"
                          component="header"
                        >
                          <Hidden smDown>Accumulated </Hidden>
                          <strong>{snowfallAccumDiff}%</strong> of Normal
                          Average
                        </Type>
                      </Box>
                    </Paper>
                  </Box>
                </WaitToFade>
                <SnowfallAccumLine
                  snowfallDataset={snowfallDataset}
                  highYear={snowfallAccumHistHighYear}
                  lowYear={snowfallAccumHistLowYear}
                />
              </Box>
              <Spacing size="x-large">
                <Divider />
              </Spacing>
              <Type variant="h4" align="center">
                Actual Snowfall
              </Type>
              <Grow in={Boolean(snowfallResponse)}>
                <Type
                  variant="caption"
                  align="center"
                  color="textSecondary"
                  component="header"
                >
                  {snowfallResponse?.meta.name},{' '}
                  {`${waterYear - 1}-${waterYear}`}
                </Type>
              </Grow>
              <Box height={{xs: 650, sm: 200, lg: 300}}>
                <PrecipCalendar
                  precipData={snowfallData}
                  waterYear={waterYear}
                  minValue={0}
                  maxValue={10}
                />
              </Box>
            </TabPanel>
          ) : null}
          <TabPanel value={tabValue} index={2}>
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
              height={{xs: 650, sm: 200, lg: 300}}
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
  valid_daterange: string[][]
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
