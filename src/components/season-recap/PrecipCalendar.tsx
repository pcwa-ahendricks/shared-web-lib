import {ChildBox, ColumnBox, RowBox} from '@components/MuiSleazebox'
import round from '@lib/round'
import {Box, Typography as Type, useTheme} from '@mui/material'
import {blueGrey, blue} from '@mui/material/colors'
import SquareIcon from 'mdi-material-ui/Square'
import React from 'react'
import {
  type CalendarDatum,
  type TimeRangeSvgProps,
  ResponsiveTimeRange
} from '@nivo/calendar'

type Props = {
  waterYear: number
  precipData: CalendarDatum[]
} & Partial<TimeRangeSvgProps>

export default function PrecipCalendar({
  waterYear,
  precipData,
  ...rest
}: Props) {
  const theme = useTheme()
  // const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <ResponsiveTimeRange
      weekdayLegendOffset={0}
      weekdayTicks={[]}
      direction="horizontal"
      // granularity="month"
      // weekDirection="horizontal"
      // monthSpacing={!isXS ? undefined : 16}
      // yearSpacing={18}
      data={precipData}
      // breakpoint={!isXS ? undefined : 3}
      // weekDirection={!isXS ? 'vertical' : 'horizontal'}
      from={`${waterYear - 1}-10-01`}
      to={`${waterYear}-09-30`}
      // monthSpacing={monthSpacing}
      // granularity={!isXS ? 'month' : 'year'}
      // granularity="month"
      emptyColor={theme.palette.grey[200]}
      // undefinedColor={theme.palette.grey[600]}
      minValue={-0.66}
      maxValue={2}
      margin={{top: 30, right: 30, bottom: 20, left: 40}}
      // yearSpacing={40}
      // monthBorderColor="#ffffff"
      dayBorderWidth={2}
      // dayBorderColor="#ffffff"
      // colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      colors={[blueGrey[100], blue[200], blue[400], blue[700]]}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
      tooltip={({value, day, color}) => {
        if (value === undefined) return null
        return (
          <Box
            bgcolor={theme.palette.common.white}
            px={1}
            py={0.5}
            boxShadow={4}
            borderRadius="3px"
          >
            <RowBox alignItems="center">
              <ColumnBox justifyContent="center" pr={0.5}>
                <SquareIcon fontSize="small" sx={{color}} />
              </ColumnBox>
              <ChildBox>
                <Type variant="caption" sx={{paddingRight: '6px'}}>
                  {day}:
                </Type>
              </ChildBox>
              <ChildBox>
                <Type component="strong" variant="caption">
                  {`${round(parseFloat(value), 1)}"`}
                </Type>
              </ChildBox>
            </RowBox>
          </Box>
        )
      }}
      {...rest}
    />
  )
}
