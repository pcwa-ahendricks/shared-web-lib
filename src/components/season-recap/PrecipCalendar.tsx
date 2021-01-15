import {ChildBox, ColumnBox, RowBox} from '@components/boxes/FlexBox'
import {
  ResponsiveEnhancedCalendar,
  CalendarDatum
} from '@kevinmoe/nivo-fork-calendar'
import round from '@lib/round'
import {
  Box,
  Typography as Type,
  useMediaQuery,
  useTheme
} from '@material-ui/core'
import {blueGrey, blue} from '@material-ui/core/colors'
import SquareIcon from 'mdi-material-ui/Square'
import React from 'react'

type Props = {
  waterYear: number
  precipData: CalendarDatum[]
}

export default function PrecipCalendar({waterYear, precipData}: Props) {
  const theme = useTheme()
  const isXS = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <ResponsiveEnhancedCalendar
      direction="horizontal"
      // granularity="month"
      // weekDirection="horizontal"
      monthSpacing={!isXS ? undefined : 16}
      // yearSpacing={18}
      data={precipData}
      breakpoint={!isXS ? undefined : 3}
      weekDirection={!isXS ? 'vertical' : 'horizontal'}
      from={`${waterYear - 1}-10-02`} // Bug w/ EnhancedCal? Offset required for display.
      to={`${waterYear}-09-30`}
      // monthSpacing={monthSpacing}
      // granularity={!isXS ? 'month' : 'year'}
      granularity="month"
      emptyColor={theme.palette.grey[200]}
      undefinedColor={theme.palette.grey[600]}
      minValue={-0.66}
      maxValue={2}
      margin={{top: 40, right: 40, bottom: 40, left: 40}}
      // yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
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
        if (value === undefined || isNaN(value)) return null
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
              <ChildBox style={{marginTop: 2, paddingRight: 6}}>
                <Type variant="caption">{day}:</Type>
              </ChildBox>
              <ChildBox style={{marginTop: 2}}>
                <Type variant="caption">
                  <strong>{`${round(value, 1)}"`}</strong>
                </Type>
              </ChildBox>
            </RowBox>
          </Box>
        )
      }}
    />
  )
}
