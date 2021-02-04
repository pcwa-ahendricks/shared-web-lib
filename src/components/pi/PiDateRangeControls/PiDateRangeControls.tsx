import React, {useContext, useCallback} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  FormControl,
  ButtonGroup,
  Button,
  useTheme
} from '@material-ui/core'
import {ColumnBox, RowBox} from 'mui-sleazebox'
import {DatePicker} from '@material-ui/pickers'
import {PiContext, setChartStartDate, setChartEndDate} from '../PiStore'
import {subYears, subQuarters, subMonths, subWeeks, startOfDay} from 'date-fns'
import {MaterialUiPickersDate} from '@material-ui/pickers/typings/date'

const PiDateRangeControls = () => {
  const theme = useTheme<Theme>()
  const {state, dispatch} = useContext(PiContext)
  const {chartStartDate, chartEndDate} = state

  // Change handlers use the start time of the day selected instead of the time of day that the page is loaded.
  const startDateChangeHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) {
        const dateDayStart = startOfDay(date)
        dispatch(setChartStartDate(dateDayStart))
      }
    },
    [dispatch]
  )

  const endDateChangeHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) {
        const dateDayStart = startOfDay(date)
        dispatch(setChartEndDate(dateDayStart))
      }
    },
    [dispatch]
  )

  const pastYearClickHandler = useCallback(() => {
    dispatch(setChartStartDate(subYears(new Date(), 1)))
    dispatch(setChartEndDate(new Date()))
  }, [dispatch])

  const pastQuarterClickHandler = useCallback(() => {
    dispatch(setChartStartDate(subQuarters(new Date(), 1)))
    dispatch(setChartEndDate(new Date()))
  }, [dispatch])

  const pastMonthClickHandler = useCallback(() => {
    dispatch(setChartStartDate(subMonths(new Date(), 1)))
    dispatch(setChartEndDate(new Date()))
  }, [dispatch])

  const pastWeekClickHandler = useCallback(() => {
    dispatch(setChartStartDate(subWeeks(new Date(), 1)))
    dispatch(setChartEndDate(new Date()))
  }, [dispatch])

  return (
    <Box boxShadow={2} bgcolor={theme.palette.common.white} m={3} p={3}>
      <ColumnBox alignItems="flex-end">
        <RowBox>
          <Box>
            <Type variant="subtitle2">Specify Date Range for Charts:</Type>
          </Box>

          <Box ml={3}>
            <FormControl>
              <DatePicker
                disableFuture
                minDate={subYears(new Date(), 1)}
                name="startDate"
                value={chartStartDate}
                format="M/dd/yyyy"
                label="Start Date"
                onChange={startDateChangeHandler}
              />
            </FormControl>
          </Box>

          <Box ml={3}>
            <FormControl>
              <DatePicker
                disableFuture
                minDate={chartStartDate}
                name="endDate"
                value={chartEndDate}
                format="M/dd/yyyy"
                label="End Date"
                onChange={endDateChangeHandler}
              />
            </FormControl>
          </Box>
        </RowBox>
        <Box mt={3}>
          <ButtonGroup
            size="small"
            aria-label="Pre-defined date range button group"
          >
            <Button onClick={pastYearClickHandler}>Past Year</Button>
            <Button onClick={pastQuarterClickHandler}>Past Quarter</Button>
            <Button onClick={pastMonthClickHandler}>Past Month</Button>
            <Button onClick={pastWeekClickHandler}>Past Week</Button>
          </ButtonGroup>
        </Box>
      </ColumnBox>
    </Box>
  )
}

export default PiDateRangeControls
