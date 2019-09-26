import React, {useContext, useCallback} from 'react'
import {
  Box,
  Theme,
  Typography as Type,
  FormControl,
  ButtonGroup,
  Button
} from '@material-ui/core'
import {useTheme} from '@material-ui/styles'
import {ColumnBox, RowBox} from '@components/boxes/FlexBox'
import {DatePicker, MaterialUiPickersDate} from '@material-ui/pickers'
import {PiContext, setStartDate, setEndDate} from '../PiStore'
import {subYears, subQuarters, subMonths, subWeeks} from 'date-fns'

const PiDateRangeControls = () => {
  const theme = useTheme<Theme>()
  const {state, dispatch} = useContext(PiContext)
  const {startDate, endDate} = state

  const startDateChangeHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) {
        dispatch(setStartDate(date))
      }
    },
    [dispatch]
  )

  const endDateChangeHandler = useCallback(
    (date: MaterialUiPickersDate) => {
      if (date) {
        dispatch(setEndDate(date))
      }
    },
    [dispatch]
  )

  const pastYearClickHandler = useCallback(() => {
    dispatch(setStartDate(subYears(new Date(), 1)))
    dispatch(setEndDate(new Date()))
  }, [dispatch])

  const pastQuarterClickHandler = useCallback(() => {
    dispatch(setStartDate(subQuarters(new Date(), 1)))
    dispatch(setEndDate(new Date()))
  }, [dispatch])

  const pastMonthClickHandler = useCallback(() => {
    dispatch(setStartDate(subMonths(new Date(), 1)))
    dispatch(setEndDate(new Date()))
  }, [dispatch])

  const pastWeekClickHandler = useCallback(() => {
    dispatch(setStartDate(subWeeks(new Date(), 1)))
    dispatch(setEndDate(new Date()))
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
                value={startDate}
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
                minDate={startDate}
                name="endDate"
                value={endDate}
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
