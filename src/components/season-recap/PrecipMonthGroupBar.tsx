// cspell:ignore accum
import alpha from 'color-alpha'
import {orange, teal, brown, blue} from '@material-ui/core/colors'
import {ResponsiveBar} from '@nivo/bar'
import {BoxLegendSvg} from '@nivo/legends'
import React, {useCallback, useMemo} from 'react'

type Props = {
  precipMoSmryData: Record<string, unknown>[]
  showHistPrecip: boolean
}

export default function PrecipMonthGroupBar({
  precipMoSmryData,
  showHistPrecip
}: Props) {
  const precipMoSmryChartColors = useMemo(
    () => [
      blue[600],
      alpha(brown[100], 0.6),
      ...(showHistPrecip ? [alpha(teal[200], 0.4)] : []),
      ...(showHistPrecip ? [alpha(orange[200], 0.6)] : [])
    ],
    [showHistPrecip]
  )

  const precipMoSmryChartKeys = useMemo(
    () => [
      'actualPrecip',
      'meanPrecip',
      ...(showHistPrecip ? ['highPrecip'] : []),
      ...(showHistPrecip ? ['lowPrecip'] : [])
    ],
    [showHistPrecip]
  )

  const precipMoSmryChartLegendLabels = useMemo(
    () => [
      'Precipitation',
      'Historical Average',
      ...(showHistPrecip ? ['Historical High'] : []),
      ...(showHistPrecip ? ['Historical Low'] : [])
    ],
    [showHistPrecip]
  )
  // Need a custom legend for bar chart. See
  // See https://codesandbox.io/s/nivo-bar-example-nf86t?file=/index.js
  const BarLegend = useCallback(
    ({
      height,
      legends,
      width
    }: {
      height: React.ComponentProps<typeof BoxLegendSvg>['containerHeight']
      width: React.ComponentProps<typeof BoxLegendSvg>['containerWidth']
      legends: React.ComponentProps<typeof ResponsiveBar>['legends']
    }) => {
      if (!legends || legends.length <= 0) {
        return <></>
      }
      return (
        <>
          {legends.map((legend) => {
            if (!legend || !legend.data) {
              return <></>
            }
            return (
              <BoxLegendSvg
                key={JSON.stringify(legend.data.map(({id}) => id))}
                {...legend}
                containerHeight={height}
                containerWidth={width}
              />
            )
          })}
        </>
      )
    },
    []
  )

  return (
    <ResponsiveBar
      data={precipMoSmryData}
      keys={precipMoSmryChartKeys}
      indexBy="month"
      margin={{top: 50, right: 50, bottom: 60, left: 50}}
      padding={0.3}
      valueScale={{type: 'linear'}}
      indexScale={{type: 'band', round: true}}
      colors={precipMoSmryChartColors}
      groupMode="grouped"
      defs={[
        // {
        //   id: 'dots',
        //   type: 'patternDots',
        //   background: 'inherit',
        //   color: '#38bcb2',
        //   size: 4,
        //   padding: 1,
        //   stagger: true
        // },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: alpha(brown[200], 0.2),
          rotation: -45,
          lineWidth: 3,
          spacing: 10
        }
      ]}
      // fill={[
      //   {
      //     match: {
      //       id: ''
      //     },
      //     id: 'dots'
      //   },
      //   {
      //     match: {
      //       id: 'meanPrecip'
      //     },
      //     id: 'lines'
      //   }
      // ]}
      borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0
        // legend: 'Month',
        // legendPosition: 'middle',
        // legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Precipitation (inches)',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      // d looks like {
      //   "id": "actualPrecip",
      //   "value": 1.92,
      //   "index": 1,
      //   "indexValue": "Dec",
      //   "data": {
      //     "actualPrecip": 1.92,
      //     "month": "Dec",
      //     "label": "2020-2021"
      //   }
      // }
      enableLabel={false}
      // labelSkipWidth={12}
      // labelSkipHeight={12}
      // labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
      // label={(d: any) => `${d.data.label}`}
      // layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']}
      layers={['grid', 'axes', 'bars', 'markers', BarLegend]}
      legends={[
        {
          data: precipMoSmryChartKeys.map((id, index) => ({
            id,
            color: precipMoSmryChartColors[index],
            label: precipMoSmryChartLegendLabels[index]
          })),
          dataFrom: 'keys',
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: 60,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  )
}
