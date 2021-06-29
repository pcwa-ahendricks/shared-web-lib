// cspell:ignore cldl
import React, {useContext, useMemo, useState, useEffect} from 'react'
import {blue} from '@material-ui/core/colors'
import SquareIcon from 'mdi-material-ui/Square'
import {
  Box,
  Theme,
  Typography as Type,
  LinearProgress,
  useTheme
} from '@material-ui/core'
import {format, differenceInDays, parseJSON} from 'date-fns'
import {PiContext, PiMetadata} from '../PiStore'
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import DlCsvButton from '@components/DlCsvButton/DlCsvButton'
import disclaimer from '../disclaimer'
import MuiNextLink from '@components/NextLink/NextLink'
import PiChartDataAttributes from '../PiChartDataAttibutes/PiChartDataAttibutes'
import useFriendlyNameMeta from '../hooks/useFriendlyNameMeta'
import useIsRiverGage from '../hooks/useIsRiverGage'
import useIsReservoirGage from '../hooks/useIsReservoirGage'
import useSWR from 'swr'
import {piApiUrl} from '@pages/recreation/flows/gages/[pid]'
import {stringify} from 'querystringify'
import {PiWebElementAttributeStream} from '@lib/services/pi/pi-web-api-types'
import {ResponsiveLine, Serie} from '@nivo/line'

type LineDataProp = React.ComponentProps<typeof ResponsiveLine>['data']

type Props = {
  attribute: string
  webId: string
  startTime: Date
  endTime: Date
  // gageId: string // just used w/ console.log
  streamSetMeta?: PiMetadata[]
}

const calcInterval = (diffInDays: number) => {
  switch (true) {
    // Day
    case diffInDays <= 1:
      return '1m' // 1 minute interval.
    // Week
    case diffInDays <= 7:
      return '15m' // 15 minute interval.
    // Month
    case diffInDays <= 32:
      return '1h' // 1 hour interval.
    // Quarter
    case diffInDays <= 92:
      return '8h' // 8 hour interval.
    // Semi-Annual
    case diffInDays <= 183:
      return '12h' // 12 hour interval.
    default:
      return '1d' // 1 day interval
  }
}

const xAxisLabels = (diffInDays: number) => {
  switch (true) {
    case diffInDays <= 7:
      return 'every 1 day'
    case diffInDays <= 32:
      return 'every 2 days'
    case diffInDays <= 92:
      return 'every 7 days'
    // case diffInDays <= 183:
    //   return 'every 1 month'
    default:
      return 'every 1 month'
  }
}

const PiChart = ({
  webId,
  startTime,
  endTime,
  attribute,
  streamSetMeta
}: Props) => {
  const theme = useTheme<Theme>()
  const {state} = useContext(PiContext)
  const {activeGageItem} = state

  const friendlyName = useFriendlyNameMeta(streamSetMeta)
  const isRiver = useIsRiverGage()
  const isReservoir = useIsReservoirGage()

  const diffInDays = differenceInDays(endTime, startTime)
  const interval = calcInterval(diffInDays)

  const qs = stringify(
    {startTime: startTime.toJSON(), endTime: endTime.toJSON(), interval},
    true
  )
  const url = `${piApiUrl}/streams/${webId}/interpolated${qs}`

  const {data, isValidating} = useSWR<PiWebElementAttributeStream>(
    webId ? url : null
  )

  const units =
    data?.UnitsAbbreviation === '°C' ? '°F' : data?.UnitsAbbreviation ?? ''
  const isFlow = units?.toLowerCase() === 'cfs'
  const isStorage = units?.toLowerCase() === 'acre ft'
  const isTemperature = units?.toLowerCase() === '°f'

  // [TODO] - Ask Chandra to add units to temperature attribute
  // const units = data?.UnitsAbbreviation || '℉' // don't use ?? operator here since '' is what we want to catch
  // const isFlow = units?.toLowerCase() === 'cfs'
  // const isStorage = units?.toLowerCase() === 'acre ft'
  // const isTemperature = units?.toLowerCase() === '℉'

  const dataItems = useMemo(() => {
    const items = data?.Items ?? []
    if (!isTemperature) {
      return items
    }
    // convert celsius to fahrenheit
    return items.map((i) => ({
      ...i,
      Value: i.Value * 1.8 + 32,
      UnitsAbbreviation: '°F'
    }))
  }, [data, isTemperature])

  // isDev &&
  //   console.log(
  //     `Chart data for ${gageId}, ${attribute} | ${format(
  //       startTime,
  //       'Pp'
  //     )} - ${format(endTime, 'Pp')} | ${interval}`
  //   )

  const attributeLabel = !attribute
    ? ''
    : attribute.match(/height/i)
    ? 'Stage'
    : attribute

  const seriesTitle = `${attributeLabel} (${units})`

  const chartTitle = useMemo(() => {
    if (!data || !streamSetMeta || !activeGageItem) {
      return ' '
    }
    const firstPart = isReservoir
      ? `${friendlyName}`
      : isRiver
      ? `Gaging Station ${activeGageItem.id.toUpperCase()}`
      : ''

    const secondPart = ` - ${attributeLabel} in ${units}`
    return `${firstPart}${secondPart}`
  }, [
    units,
    activeGageItem,
    friendlyName,
    data,
    streamSetMeta,
    attributeLabel,
    isRiver,
    isReservoir
  ])

  const maxValue = useMemo(
    () =>
      dataItems.length > 0
        ? dataItems.reduce((p, c) => {
            const q = p ?? c
            return c.Value > q.Value ? c : q
          })
        : null,
    [dataItems]
  )

  const minValue = useMemo(
    () =>
      dataItems.length > 0
        ? dataItems.reduce((p, c) => {
            const q = p ?? c
            return c.Value < q.Value ? c : q
          })
        : null,
    [dataItems]
  )

  const buttonCaption = `Download ${
    activeGageItem?.id ?? ''
  } ${attributeLabel} CSV`

  const csvFileName = `${activeGageItem?.id ?? ''}-${attributeLabel}.csv`

  const csvData = useMemo(
    () =>
      dataItems.map(({Timestamp, Value}) => ({
        Timestamp: format(parseJSON(Timestamp), 'M/dd/yyyy h:mm aa'),
        Value
      })),
    [dataItems]
  )

  const csvHeader = useMemo(
    () => `"DISCLAIMER - ${disclaimer.p1}\n${disclaimer.p2}"`,
    []
  )

  const seriesData: Serie[] = useMemo(
    () => [
      {
        id: seriesTitle,
        data: dataItems.map(({Timestamp, Value: y}) => ({
          x: format(parseJSON(Timestamp), 'yyyy-MM-dd HHmm'),
          y
        }))
      }
    ],
    [dataItems, seriesTitle]
  )

  const linearProgressEl = useMemo(
    () =>
      isValidating ? (
        <Box position="absolute" top={0} left={0} right={0} zIndex={2}>
          <LinearProgress variant="indeterminate" color="secondary" />
        </Box>
      ) : null,
    [isValidating]
  )

  const [chartData, setChartData] = useState<LineDataProp>([])
  useEffect(() => {
    setTimeout(() => {
      setChartData([...seriesData])
    })
  }, [seriesData])

  // Add a 10% margin to the chart on the Y axis for the top and a 10% margin on the bottom
  const maxV = maxValue?.Value
  const minV = minValue?.Value

  const scaleMaxY = maxV && minV ? maxV + (maxV - minV) * 0.1 : null
  const scaleMinY = maxV && minV ? minV - (maxV - minV) * 0.1 : null

  const yFormat = isFlow || isStorage ? '>-,.1~f' : '>-,.2~f'

  return (
    <Box
      boxShadow={2}
      bgcolor={theme.palette.common.white}
      m={3}
      p={3}
      position="relative"
    >
      {linearProgressEl}
      <Type variant="h3" gutterBottom>
        {chartTitle}
      </Type>
      <PiChartDataAttributes
        items={data?.Items}
        minValue={minValue}
        maxValue={maxValue}
        interval={interval}
        isLoading={isValidating}
        streamSetMeta={streamSetMeta}
      />
      <Box position="relative" width="100%" height={400}>
        <ResponsiveLine
          data={chartData}
          colors={blue[400]}
          margin={{top: 20, right: 60, bottom: 90, left: 65}}
          xScale={{
            type: 'time',
            format: '%Y-%m-%d %H%M',
            useUTC: false,
            precision: 'minute'
          }}
          xFormat={(dv: string | number | Date) => {
            if (typeof dv !== 'string' && typeof dv !== 'number') {
              return format(dv, `M-dd',' h:mm aa`)
            }
            return ''
          }}
          yScale={{
            type: 'linear',
            max: scaleMaxY ?? 'auto',
            min: scaleMinY ?? 'auto',
            stacked: false,
            reverse: false
          }}
          yFormat={yFormat}
          curve="monotoneX"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (dv) => {
              if (typeof dv !== 'string' && typeof dv !== 'number') {
                return format(dv, "d'.' LLL")
              }
              return ''
            },
            tickValues: xAxisLabels(diffInDays),
            // legend: 'Date',
            tickRotation: 0,
            // legendOffset: 40,
            legendPosition: 'middle'
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: seriesTitle,
            legendOffset: -60,
            legendPosition: 'middle',
            format: yFormat
          }}
          enablePoints={false}
          // pointSize={10}
          pointColor={{theme: 'background'}}
          pointBorderWidth={2}
          pointBorderColor={{from: 'serieColor'}}
          pointLabelYOffset={-12}
          crosshairType="x"
          useMesh={true}
          lineWidth={1.8}
          layers={[
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
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 70,
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
          // enableSlices="x"
          tooltip={({point}) => {
            const {serieColor: color, data} = point
            const {y, yFormatted, xFormatted} = data

            if (y === undefined) return null
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
                  <ChildBox style={{paddingRight: 6}}>
                    <Type variant="body2">
                      <Type variant="inherit">{xFormatted}</Type>:
                    </Type>
                  </ChildBox>
                  <ChildBox>
                    <Type variant="body2">
                      <strong>
                        {yFormatted} {units}
                      </strong>
                    </Type>
                  </ChildBox>
                </RowBox>
              </Box>
            )
          }}
        />
      </Box>
      <RowBox justifyContent="flex-end" textAlign="right" fontStyle="italic">
        {isValidating ? null : (
          <Type variant="body2">
            {`Generated on ${format(new Date(), "MMM do',' yyyy',' h:mm aa")}`}
          </Type>
        )}
      </RowBox>
      <RowBox justifyContent="flex-end" textAlign="right">
        {isValidating ? null : (
          <MuiNextLink
            variant="caption"
            color="textSecondary"
            href="/"
            underline="none"
          >
            &copy; PCWA
          </MuiNextLink>
        )}
      </RowBox>
      <DlCsvButton data={csvData} header={csvHeader} fileName={csvFileName}>
        {buttonCaption}
      </DlCsvButton>
    </Box>
  )
}

export default PiChart
