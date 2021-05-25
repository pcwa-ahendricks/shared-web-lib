// cspell:ignore accum
import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import round from '@lib/round'
import {Box, Typography as Type, useTheme} from '@material-ui/core'
import SquareIcon from 'mdi-material-ui/Square'
import {orange, teal, brown, blue} from '@material-ui/core/colors'
import {CustomLayer, Serie, ResponsiveLine, Datum} from '@nivo/line'
import React, {useMemo} from 'react'

type Props = {
  precipDataset: Serie[]
  lowYear: number | null
  highYear: number | null
}

export default function PrecipAccumLine({
  precipDataset,
  highYear,
  lowYear
}: Props) {
  const theme = useTheme()
  // Add a 10% margin to the chart on the Y axis for the top.
  const precipYScaleMax = useMemo(() => {
    const high = precipDataset
      .reduce<Datum[]>((prev, curr) => [...prev, ...curr.data], [])
      .reduce<number | null>((prev, curr) => {
        const currVal = curr?.y ?? 0
        if (typeof currVal !== 'number') {
          return prev || null
        }
        if (!prev) {
          return currVal
        }
        return prev > currVal ? prev : currVal
      }, null)
    if (!high) {
      return null
    }
    const buffer = high * 0.1
    return round(high + buffer, 0)
  }, [precipDataset])

  const styleById = useMemo(
    () =>
      ({
        'Accumulated Precip.': {
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
        'Average Accum. Precip.': {
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
    () =>
      ({series, lineGenerator, xScale, yScale}) => {
        return series.map(({id, data, color}) => {
          const idStr = id.toString()
          return (
            <path
              key={id}
              d={
                lineGenerator(
                  // [TODO] Remove type cast to any
                  data.map((d): any => ({
                    ...(d.data?.x != null &&
                      d.data?.x != undefined && {x: xScale(d.data?.x)}),
                    ...(d.data?.y != null &&
                      d.data?.y != undefined && {y: yScale(d.data?.y)})
                  }))
                  // [TODO] Remove type cast to any
                ) as any
              }
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
      margin={{top: 30, right: 40, bottom: 80, left: 70}}
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
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 60,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 160,
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
      tooltip={({point}) => {
        const {serieColor: color, serieId, data} = point
        const {y, yFormatted, xFormatted} = data

        const getLabel = () => {
          switch (serieId) {
            case 'Accumulated Precip.':
              return 'Accumulated on'
            case 'Average Accum. Precip.':
              return 'Average on'
            case 'Recorded Low':
              return `Low (${lowYear}) on`
            case 'Recorded High':
              return `High (${highYear}) on`
            default:
              return ''
          }
        }
        const label = getLabel()
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
                <Type variant="caption">
                  {label}{' '}
                  <Type variant="inherit">
                    <strong>{xFormatted}</strong>
                  </Type>
                  :
                </Type>
              </ChildBox>
              <ChildBox>
                <Type variant="caption">
                  <strong>{yFormatted}"</strong>
                </Type>
              </ChildBox>
            </RowBox>
          </Box>
        )
      }}
    />
  )
}
