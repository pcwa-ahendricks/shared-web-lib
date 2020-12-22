// cspell:ignore accum
import round from '@lib/round'
import {orange, teal, brown, blue} from '@material-ui/core/colors'
import {CustomLayer, Serie, ResponsiveLine, Datum} from '@nivo/line'
import React, {useMemo} from 'react'

type Props = {
  precipDataset: Serie[]
}

export default function PrecipAccumLine({precipDataset}: Props) {
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
                  d.data?.x != undefined && {x: xScale(d.data?.x)}),
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
      margin={{top: 50, right: 50, bottom: 60, left: 50}}
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
    />
  )
}
