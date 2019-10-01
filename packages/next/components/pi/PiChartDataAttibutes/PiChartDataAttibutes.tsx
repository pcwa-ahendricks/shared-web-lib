// cspell:ignore cldl
import React, {useContext, useMemo} from 'react'
import {Box, Typography as Type} from '@material-ui/core'
// import {blue} from '@material-ui/core/colors'
// import {useTheme, makeStyles, createStyles} from '@material-ui/styles'
import {createStyles, makeStyles} from '@material-ui/styles'
import {format, formatDistance} from 'date-fns'
import {AttributeStream, PiContext} from '../PiStore'
import {RowBox} from '@components/boxes/FlexBox'
import clsx from 'clsx'
import {AttribStreamValue} from '@lib/services/pi/pi-web-api-types'

type Props = {
  data?: AttributeStream
  minValue?: AttribStreamValue | null
  maxValue?: AttribStreamValue | null
}

const useStyles = makeStyles(() =>
  createStyles({
    blurWhenLoading: {
      '&$isLoading': {
        color: 'transparent',
        textShadow: '0 0 4px rgba(0,0,0,0.5)'
      }
    },
    isLoading: {}
  })
)

const PiChartDataAttributes = ({data, minValue, maxValue}: Props) => {
  const classes = useStyles()
  const {state} = useContext(PiContext)
  const {
    streamSetMeta,
    activeGageItem,
    startDate,
    endDate,
    interval,
    isLoadingAttributeStreams: isLoading
  } = state

  const isReservoir = useMemo(
    () =>
      activeGageItem &&
      activeGageItem.baseElement === '\\\\BUSINESSPI2\\OPS\\Reservoirs',
    [activeGageItem]
  )

  const friendlyName = useMemo(() => {
    const f = streamSetMeta.find(
      (m) => m.name && m.name && m.name.match(/friendly\s?name/i)
    )
    return (f && f.value) || ''
  }, [streamSetMeta])

  const gagingStationCaption = useMemo(() => {
    if (!activeGageItem) {
      return ''
    }
    return isReservoir
      ? friendlyName
      : `${activeGageItem.id.toUpperCase()} - ${friendlyName}`
  }, [activeGageItem, friendlyName, isReservoir])

  //  ex.) Fri 9/20/2019 1:00 PM through Fri 9/27/2019 2:00 PM (7 days)
  const dateRangeCaption = useMemo(
    () =>
      `${format(startDate, 'EE M/dd/yyyy h:mm bb')} through ${format(
        endDate,
        'EE M/dd/yyyy h:mm bb'
      )} (${formatDistance(startDate, endDate)})`,

    [startDate, endDate]
  )

  // ex.) 1.80 CFS on Fri 9/20/2019 1:00 PM
  const maxValueCaption = useMemo(() => {
    if (!maxValue || !maxValue.Value) {
      return ''
    }
    const timestamp = new Date(maxValue.Timestamp)
    return `${maxValue.Value.toLocaleString()} ${
      maxValue.UnitsAbbreviation
    } on ${format(timestamp, 'EE M/dd/yyyy h:mm bb')}`
  }, [maxValue])

  const minValueCaption = useMemo(() => {
    if (!minValue || !minValue.Value) {
      return ''
    }
    const timestamp = new Date(minValue.Timestamp)
    return `${minValue.Value.toLocaleString()} ${
      minValue.UnitsAbbreviation
    } on ${format(timestamp, 'EE M/dd/yyyy h:mm bb')}`
  }, [minValue])

  // ex.) 677 data points returned in 15 minute intervals.
  const dataPointsCaption = useMemo(() => {
    let intervalCaption = ''
    switch (true) {
      // Minute
      case /\d+m/i.test(interval):
        intervalCaption = interval.replace(/(\d)(m)/i, '$1 minute')
        break
      // Hour
      case /\d+h/i.test(interval):
        intervalCaption = interval.replace(/(\d)(h)/i, '$1 hour')
        break
      // Day
      case /\d+d/i.test(interval):
        intervalCaption = interval.replace(/(\d)(d)/i, '$1 day')
        break
    }
    return data && intervalCaption
      ? `${data.items.length} data points returned in ${intervalCaption} intervals.`
      : ''
  }, [data, interval])

  const DataType = ({children, ...rest}: any) => (
    <Type variant="subtitle2" {...rest}>
      {children}
    </Type>
  )

  return (
    <RowBox>
      <Box flex="20%">
        <DataType>Gaging Station:</DataType>
        <DataType>Date Range:</DataType>
        <DataType>Largest Value:</DataType>
        <DataType>Smallest Value:</DataType>
        <DataType>Data Points:</DataType>
      </Box>
      <Box
        flex="80%"
        className={clsx(classes.blurWhenLoading, {
          [classes.isLoading]: isLoading
        })}
      >
        <DataType>{gagingStationCaption}</DataType>
        <DataType>{dateRangeCaption}</DataType>
        <DataType>{maxValueCaption}</DataType>
        <DataType>{minValueCaption}</DataType>
        <DataType>{dataPointsCaption}</DataType>
      </Box>
    </RowBox>
  )
}

export default PiChartDataAttributes
