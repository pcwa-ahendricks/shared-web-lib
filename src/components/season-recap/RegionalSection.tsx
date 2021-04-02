// cspell:ignore perc
import React, {useCallback, useMemo, useState, useEffect} from 'react'
import round from '@lib/round'
import useSWR from 'swr'
import {
  Box,
  Typography as Type,
  Paper,
  Link,
  Popover,
  createStyles,
  CircularProgress,
  makeStyles,
  Theme,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import Spacing from '@components/boxes/Spacing'
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab'
import {ChildBox, ColumnBox, RowBox, FlexBox} from 'mui-sleazebox'
import StrongEmphasis from '@components/typography/StrongEmphasis/StrongEmphasis'
import toTitleCase from '@lib/toTitleCase'
import isNumber from 'is-number'
import MediaDialogOnClick from '@components/MediaDialogOnClick/MediaDialogOnClick'
import {grey} from '@material-ui/core/colors'
import Image from 'next/image'
import {stringify} from 'querystringify'
import {format, getYear, subMonths} from 'date-fns'
import WeatherIcon from '@components/WeatherIcon/WeatherIcon'
import {CountyMetaResponse} from '@pages/water-year-recap'
import Animate, {AnimateProps} from '@components/Animate/Animate'
import {useDebounce} from 'use-debounce/lib'
import ClimateChangeLine from './ClimateChangeLine'

type Props = {countyResponse?: CountyMetaResponse}

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

const DEFAULT_REGIONAL_TIME_FRAME = 'waterYear' as RegionalTimeFrame

const prcNrmlPrcpImgSrc = {
  waterYear:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPNormCA.png',
  last30Days:
    'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPNormCA.png',
  last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dPNormCA.png'
} as const

// const dprtNrmlPrecipImgSrc = {
//   waterYear:
//     'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/WaterPDeptCA.png',
//   last30Days:
//     'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/30dPDeptCA.png',
//   last7Days: 'https://hprcc.unl.edu/products/maps/acis/subrgn/CA/7dPDeptCA.png'
// } as const

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
    climChgBox: {
      borderWidth: '1px !important',
      borderColor: `${theme.palette.grey[300]} !important`,
      borderStyle: 'solid !important',
      backgroundColor: theme.palette.common.white
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
export default function RegionalSection({countyResponse}: Props) {
  const classes = useStyles()
  const [regionalWaterYear] = useState(getYear(new Date()))
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
  // const [departNormalPrecipSrc, setDepartNormalPrecipSrc] = useState<string>(
  //   dprtNrmlPrecipImgSrc[regionalTimeFrame]
  // )
  const [precipSrc, setPrecipSrc] = useState<string>(
    precipImgSrc[regionalTimeFrame]
  )
  const [tempDepartSrc, setTempDepartSrc] = useState<string>(
    tempDepartImgSrc[regionalTimeFrame]
  )
  const multiStnQs = stringify({waterYear: regionalWaterYear}, true)

  const now = useMemo(() => new Date(), [])
  const climChangeEndYear = useMemo(() => now.getFullYear(), [now])
  const twoMonthsAgo = useMemo(() => subMonths(now, 2), [now])
  const twoMonthsAgoMo = useMemo(() => twoMonthsAgo.getMonth() + 1, [
    twoMonthsAgo
  ]) // getMonth() returns a 0 based index
  const twoMonthsAgoFrmt = format(twoMonthsAgo, 'MMMM')
  const twoMonthsAgoYearFrmt = format(twoMonthsAgo, 'yy')
  const fourMonthsAgoFrmt = useMemo(() => format(subMonths(now, 4), 'MMMM'), [
    now
  ])
  const fourMonthsAgoYrFrmt = useMemo(() => format(subMonths(now, 4), 'yy'), [
    now
  ])

  const {data: climChgData} = useSWR<ClimChgResponse>(
    `https://www.ncdc.noaa.gov/cag/county/time-series/CA-061-tavg-3-${twoMonthsAgoMo}-1895-${climChangeEndYear}.json?base_prd=true&begbaseyear=1901&endbaseyear=2000`
  )
  const noaaClimChgUrl = `https://www.ncdc.noaa.gov/cag/county/time-series/CA-061/tavg/3/${twoMonthsAgoMo}/1895-${climChangeEndYear}?base_prd=true&begbaseyear=1901&endbaseyear=2000&trend=true&trend_base=10&begtrendyear=1895&endtrendyear=2021`

  /* Regional Precip */
  const [
    multiStnPrcpSmryUrlBase,
    setMultiStnPrcpSmryUrlBase
  ] = useState<MultiStnPrcpSmryUrlBase>(multiStnPrcpSmryUrls[regionalTimeFrame])

  const {
    data: multiStnPrecipSmryRes,
    isValidating: multiStnPrecipSmryResValidating
  } = useSWR<MultiStnSmryResponse>(`${multiStnPrcpSmryUrlBase}${multiStnQs}`)

  const [multiStnPrecipSmryResLoading] = useDebounce(
    multiStnPrecipSmryResValidating,
    800
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
        // Don't divide by zero
        (parseFloat(d.data[0]) /
          (parseFloat(d.data[1]) === 0 ? 0.0000001 : parseFloat(d.data[1]))) *
          100
      ] as [number, number, number, number]
    }))
    return mapped ?? []
  }, [multiStnPrecipSmryRes, countyResponse])

  const multiStnPrecipSmryStns = useMemo(
    () =>
      multiStnPrecipSmryData
        .map((d) => d.meta.name)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [multiStnPrecipSmryData]
  )

  const multiStnPrecipSmryCounties = useMemo(
    () =>
      multiStnPrecipSmryData
        .map((d) => d.meta.county)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
        .reverse(),
    [multiStnPrecipSmryData]
  )

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

  const [multiStnSnowSmryResLoading] = useDebounce(
    multiStnSnowSmryResValidating,
    800
  )

  const multiStnSnowSmryData = useMemo(() => {
    // Only return station data for stations that have data for all three values
    const filtered = multiStnSnowSmryRes?.data
      .filter((d) => d.data.every((v) => isNumber(v)))
      // These stations sometimes show bogus data
      .filter((d) => d.meta.name?.toUpperCase() !== 'GRASS VALLEY NO. 2')
      .filter((d) => d.meta.name?.toUpperCase() !== 'NEVADA CITY')

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

  const multiStnSnowSmryStns = useMemo(
    () =>
      multiStnSnowSmryData
        .map((d) => d.meta.name)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [multiStnSnowSmryData]
  )

  const multiStnSnowSmryCounties = useMemo(
    () =>
      multiStnSnowSmryData
        .map((d) => d.meta.county)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
        .reverse(),
    [multiStnSnowSmryData]
  )

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

  const [multiStnMxTempSmryResLoading] = useDebounce(
    multiStnMxTempSmryResValidating,
    800
  )

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

  const multiStnMxTempSmryStns = useMemo(
    () =>
      multiStnMxTempSmryData
        .map((d) => d.meta.name)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort(),
    [multiStnMxTempSmryData]
  )

  const multiStnMxTempSmryCounties = useMemo(
    () =>
      multiStnMxTempSmryData
        .map((d) => d.meta.county)
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort()
        .reverse(),
    [multiStnMxTempSmryData]
  )

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

  useEffect(() => {
    setPercNormalPrecipSrc(prcNrmlPrcpImgSrc[regionalTimeFrame])
    // setDepartNormalPrecipSrc(dprtNrmlPrecipImgSrc[regionalTimeFrame])
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

  const Zoom = useCallback(
    ({children, ...rest}: Partial<AnimateProps>) => (
      <Animate name="zoomIn" hideUntilAnimate speed="faster" {...rest}>
        {children}
      </Animate>
    ),
    []
  )

  const theme = useTheme()
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <>
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
                {multiStnPrecipSmryResLoading ? <AbsSpinner /> : null}
                <Zoom animate={isNumber(precipPerc)}>
                  <ColumnBox child alignItems="center">
                    <Type
                      variant="body1"
                      className={classes.regionalStat}
                      align="center"
                    >
                      {relativePrecip(precipPerc)}
                    </Type>
                    <Box maxWidth="90%">
                      <Type align="center">
                        {isPrecipPercent(precipPerc) ? 'of ' : null} the Average
                        Rainfall
                      </Type>
                    </Box>
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
                </Zoom>
              </ColumnBox>
              <ColumnBox child alignItems="center" position="relative">
                {multiStnSnowSmryResLoading ? <AbsSpinner /> : null}
                <Zoom animate={isNumber(snowPerc)}>
                  <ColumnBox child alignItems="center">
                    <Type variant="body1" className={classes.regionalStat}>
                      {relativePrecip(snowPerc)}
                    </Type>
                    <Box maxWidth="90%">
                      <Type align="center">
                        {isPrecipPercent(snowPerc) ? 'of ' : null} the Average
                        Snowfall
                      </Type>
                    </Box>
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
                            {multiStnSnowSmryCounties.length > 1 ? 'ies' : 'y'}
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
                </Zoom>
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
                {multiStnMxTempSmryResLoading ? <AbsSpinner /> : null}
                <Zoom animate={isNumber(mxTempDepart)}>
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
                    <Box maxWidth="90%">
                      <Type align="center">Daily on Average</Type>
                    </Box>
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
                </Zoom>
              </ColumnBox>
            </RowBox>
          </ColumnBox>
        </RowBox>
      </Paper>
      <Spacing size="x-large" />
      {/* <RowBox justifyContent="space-between"> */}
      <RowBox responsive flexSpacing={2}>
        <ChildBox flex="67%">
          <Type variant="h4" gutterBottom>
            Precipitation Maps
          </Type>
          {/* </RowBox> */}
          <RowBox responsive flexSpacing={2}>
            <ChildBox flex="33.33%">
              <MediaDialogOnClick
                mediaName="Actual Precipitation"
                mediaUrl={precipSrc}
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
            {/* <ChildBox flex="33.33%">
          <MediaDialogOnClick
            mediaName="Departure from Normal"
            mediaUrl={departNormalPrecipSrc}
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
        </ChildBox> */}
            <ChildBox flex="33.33%">
              <MediaDialogOnClick
                mediaName="Percent of Normal"
                mediaUrl={percNormalPrecipSrc}
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
        </ChildBox>
        {/* <Spacing size="large" /> */}
        <ChildBox flex="33%">
          <Type variant="h4" gutterBottom>
            Temperature Maps
          </Type>

          <ChildBox flex>
            <MediaDialogOnClick
              mediaName="Temperature Departure"
              mediaUrl={tempDepartSrc}
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
        </ChildBox>
      </RowBox>
      <Spacing size="large" />
      <Type variant="h4">Average Temperature for Placer County</Type>
      <Type variant="caption" gutterBottom>
        {fourMonthsAgoFrmt} &#8217;{fourMonthsAgoYrFrmt} - {twoMonthsAgoFrmt}{' '}
        &#8217;
        {twoMonthsAgoYearFrmt} (3-Month period)
      </Type>
      <Spacing size="x-small" />
      <RowBox height={240} width="100%">
        <ChildBox
          flex={isMdUp ? '0 1 50%' : '0 1 100%'}
          className={classes.climChgBox}
        >
          <ClimateChangeLine tempDataset={climChgData} />
        </ChildBox>
      </RowBox>
      <Spacing size="x-large" />
      <span style={{paddingRight: 4}}>
        <Type variant="caption" color="textSecondary" gutterBottom>
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
        </Type>{' '}
      </span>
      |{' '}
      <span style={{paddingLeft: 4}}>
        <Type variant="caption" color="textSecondary">
          <em>
            Average Temperatures are provided by{' '}
            <Link
              style={{outline: 'none'}}
              variant="inherit"
              href={noaaClimChgUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              National Oceanic and Atmospheric Administration (NOAA)
            </Link>
          </em>
        </Type>
      </span>
    </>
  )
}

function relativePrecip(percent?: number) {
  if (percent === undefined || !isNumber(percent)) {
    return null
  }
  const roundedPerc = round(percent, 0)
  if (roundedPerc > 110) {
    return `${round(roundedPerc / 100, 1)}x`
  } else if (roundedPerc === 0) {
    return '< 1%'
  }

  return `${roundedPerc}%`
}

function isPrecipPercent(percent?: number) {
  if (!percent || !isNumber(percent)) {
    return false
  }
  const roundedPerc = round(percent, 0)
  if (roundedPerc <= 110) {
    return true
  }
  return false
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
export interface ClimChgResponse {
  description: Description
  data: Data
}
interface Data {
  [id: string]: {
    value: string
    anomaly: string
  }
}

interface Description {
  title: string
  units: string
  base_period: string
  missing: string
}
