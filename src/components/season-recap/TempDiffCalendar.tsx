import {ChildBox, ColumnBox, RowBox} from 'mui-sleazebox'
import {
  ResponsiveEnhancedCalendar,
  CalendarDatum
} from '@kevinmoe/nivo-fork-calendar'
import round from '@lib/round'
import {Box, Typography as Type, useMediaQuery, useTheme} from '@mui/material'
import {blue, brown, deepOrange} from '@mui/material/colors'
import SquareIcon from 'mdi-material-ui/Square'
import React from 'react'

type Props = {
  waterYear: number
  tempObservedDiffData: CalendarDatum[]
}

export default function TempDiffCalendar({
  waterYear,
  tempObservedDiffData
}: Props) {
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <ResponsiveEnhancedCalendar
      direction="horizontal"
      // granularity="month"
      // weekDirection="horizontal"
      monthSpacing={!isXS ? undefined : 16}
      // yearSpacing={18}
      breakpoint={!isXS ? undefined : 3}
      weekDirection={!isXS ? 'vertical' : 'horizontal'}
      data={tempObservedDiffData}
      from={`${waterYear - 1}-10-02`} // Bug w/ EnhancedCal? Offset required for display.
      to={`${waterYear}-09-30`}
      // monthSpacing={monthSpacing}
      tooltip={({value, day, color}) => {
        if (value === undefined || isNaN(value)) return null
        const newVal = `${round(Math.abs(value))}° ${
          value > 0 ? 'warmer' : 'cooler'
        }`
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
                <SquareIcon fontSize="small" style={{color}} />
              </ColumnBox>
              <ChildBox style={{paddingRight: 6}}>
                <Type variant="caption">{day}:</Type>
              </ChildBox>
              <ChildBox>
                <Type variant="caption">
                  <strong>{newVal}</strong>
                </Type>
              </ChildBox>
            </RowBox>
          </Box>
        )
        // return (
        // <BasicTooltip
        //   id={day}
        //   value={newVal}
        //   color={color}
        //   enableChip={true}
        // />
        // )
      }}
      granularity="month"
      emptyColor={theme.palette.grey[200]}
      undefinedColor={theme.palette.grey[600]}
      minValue={-22}
      maxValue={22}
      margin={{top: 30, right: 30, bottom: 20, left: 40}}
      // yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      // colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
      colors={[
        // '#a50026',
        // '#d73026',
        // '#f46d43',
        // '#fead61',
        // '#fee091',
        // blue[900],
        blue[700],
        // blue[400],
        blue[300],
        blue[100],
        // '#feffbf', // light yellow
        // theme.palette.grey[400],
        // green[100],
        // alpha('#d7ffc1', 0.4),
        brown[100],
        deepOrange[100],
        deepOrange[300],
        // deepOrange[400],
        deepOrange[700]
        // deepOrange[900]
        // '#ebe4d2',
        // '#e0f3f8',
        // '#a0cad9',
        // '#74add1',
        // '#4475b4',
        // '#313695'
      ]}
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
    />
  )
}
