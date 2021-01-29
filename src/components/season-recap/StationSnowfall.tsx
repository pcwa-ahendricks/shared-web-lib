// cspell:ignore accum
import React, {useMemo, useState, useEffect, useCallback} from 'react'
import {
  Typography as Type,
  Divider,
  Box,
  Paper,
  Hidden
} from '@material-ui/core'
import SnowfallAccumLine from '@components/season-recap/SnowAccumLine'
import useSWR from 'swr'
import slugify from 'slugify'
import {stringify} from 'querystringify'
import round from '@lib/round'
import Spacing from '@components/boxes/Spacing'
import {
  PrecipResponse,
  PrecipHistResponse,
  parseWaterYear,
  refreshInterval,
  StationId
} from '@pages/season-recap'
import isNumber from 'is-number'
import PrecipCalendar from './PrecipCalendar'
import {ResponsiveLine} from '@nivo/line'
import Animate, {AnimateProps} from '@components/Animate/Animate'

type LineDataProp = React.ComponentProps<typeof ResponsiveLine>['data']
type Props = {
  waterYear: number
  sid: StationId
}

export default function StationSnowfall({waterYear, sid}: Props) {
  const qs = stringify({sid: slugify(sid), waterYear}, true)
  const {data: snowfallResponse} = useSWR<PrecipResponse>(
    `/api/acis/snowfall${qs}`,
    {refreshInterval}
  )
  const {data: snowfallHistResponse} = useSWR<PrecipHistResponse>(
    `/api/acis/snowfall-hist${qs}`,
    {refreshInterval}
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

  const Fade = useCallback(
    ({children, ...rest}: Partial<AnimateProps>) => (
      <Animate
        name="fadeIn"
        animate={Boolean(snowfallResponse)}
        hideUntilAnimate
        {...rest}
      >
        {children}
      </Animate>
    ),
    [snowfallResponse]
  )

  return (
    <>
      <Spacing size="x-large" />
      <Type variant="h4" align="center">
        Accumulated Snowfall
      </Type>{' '}
      <Fade>
        <Type
          variant="caption"
          align="center"
          color="textSecondary"
          component="header"
        >
          {snowfallResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
          <Type variant="inherit" color="inherit">
            <em>
              {' '}
              (using {snowfallResponse?.meta.valid_daterange[0][0].substr(0, 4)}
              -{snowfallResponse?.meta.valid_daterange[0][1].substr(0, 4)} for
              historical data)
            </em>
          </Type>
        </Type>
      </Fade>
      <Box height={{xs: 400, lg: 450}} position="relative">
        <Fade
          animate={Boolean(snowfallAccumDiff)}
          position="absolute"
          top={64}
          left={64}
          zIndex={2}
        >
          <Paper elevation={2} square>
            <Box p={1}>
              <Type variant="caption" align="center" component="header">
                <Hidden smDown>Accumulated </Hidden>
                <strong>{snowfallAccumDiff}%</strong> of Normal Average
              </Type>
            </Box>
          </Paper>
        </Fade>
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
      <Fade>
        <Type
          variant="caption"
          align="center"
          color="textSecondary"
          component="header"
        >
          {snowfallResponse?.meta.name}, {`${waterYear - 1}-${waterYear}`}
        </Type>
      </Fade>
      <Box height={{xs: 650, sm: 200, lg: 300}}>
        <PrecipCalendar
          precipData={snowfallData}
          waterYear={waterYear}
          minValue={0}
          maxValue={10}
        />
      </Box>
    </>
  )
}
