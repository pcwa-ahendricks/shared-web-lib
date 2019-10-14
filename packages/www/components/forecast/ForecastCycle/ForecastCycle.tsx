// cspell:ignore frcsts
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react'
import ForecastDisplay, {
  ForecastData
} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {makeStyles} from '@material-ui/core/styles'
import {Box} from '@material-ui/core'
import {BoxProps} from '@material-ui/core/Box'
import ForecastPopover from '@components/forecast/ForecastPopover/ForecastPopover'
import {maxInt} from '@lib/util'
import {
  ForecastContext,
  setActiveCycleForecastId,
  setCycleTimeoutId
} from '../ForecastStore'
import useInterval from '@hooks/useInterval'

type Props = {
  cycleInterval?: number
  crossFadeDuration?: number
  forecasts?: ForecastData[]
} & BoxProps

const useStyles = makeStyles({
  trans: {
    '& .cross-fade-leave': {
      opacity: 1
    },
    '& .cross-fade-leave.cross-fade-leave-active': {
      opacity: 0,
      transition: 'opacity 1s ease-in'
    },
    '& .cross-fade-enter': {
      opacity: 0
    },
    '& .cross-fade-enter.cross-fade-enter-active': {
      opacity: 1,
      transition: 'opacity 1s ease-in'
    },
    '& .cross-fade-height': {
      transition: 'height 0.5s ease-in-out'
    }
  }
})

const ForecastCycle = ({
  forecasts = [],
  cycleInterval = 1000 * 10, // 10 seconds
  crossFadeDuration = 1000 * 1, // 1 second
  ...rest
}: Props) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [transitionEnter, setTransitionEnter] = useState<boolean>(false)

  const {state, dispatch} = useContext(ForecastContext)

  const intervalHandler = useCallback(() => {
    // We need to get the current state each time to properly increment active forecast.
    const {activeCycleForecastId} = state
    dispatch(
      setActiveCycleForecastId(
        !activeCycleForecastId ||
          activeCycleForecastId >= maxInt(forecasts, 'id')
          ? 1
          : activeCycleForecastId + 1
      )
    )
  }, [dispatch, state, forecasts])

  const timeoutId = useInterval(intervalHandler, cycleInterval)

  useEffect(() => {
    const {cycleTimeoutId} = state
    // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
    if (cycleTimeoutId) {
      return
    } else if (!timeoutId) {
      return
    } else {
      dispatch(setCycleTimeoutId(timeoutId))
    }
  }, [state, timeoutId, dispatch])

  const activeForecast = useCallback(
    () =>
      forecasts.find((forecast) => forecast.id === state.activeCycleForecastId),
    [forecasts, state]
  )

  const handlePopoverOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const forecast = useMemo(() => activeForecast(), [activeForecast])

  const hasAnchorEl = useMemo(() => Boolean(anchorEl), [anchorEl])

  const forecastDisplay = useMemo(
    () =>
      forecast && forecast.id ? (
        <ForecastDisplay key={forecast.id} forecast={forecast} />
      ) : null,
    [forecast]
  )

  const transitionLeaveHandler = useCallback(() => {
    // Shorten the "Enter" transition during first enter (every page load). See below.
    if (!transitionEnter) {
      setTransitionEnter(true)
    }
  }, [transitionEnter])

  return (
    <Box
      aria-owns={hasAnchorEl ? 'forecast-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      {...rest}
    >
      <ReactCSSTransitionReplace
        className={classes.trans}
        transitionName="cross-fade"
        transitionEnterTimeout={
          !transitionEnter ? crossFadeDuration * 0.1 : crossFadeDuration
        }
        transitionLeaveTimeout={crossFadeDuration}
        onTransitionEnd={transitionLeaveHandler}
      >
        {forecastDisplay}
      </ReactCSSTransitionReplace>
      <ForecastPopover
        open={hasAnchorEl}
        anchorEl={anchorEl}
        onPopoverClose={handlePopoverClose}
      />
    </Box>
  )
}

export default ForecastCycle
