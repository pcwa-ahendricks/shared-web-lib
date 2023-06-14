// cspell:ignore frcsts
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext
} from 'react'
import ForecastDisplay, {
  ForecastDataset
} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import {Box, BoxProps} from '@mui/material'
import ForecastPopover from '@components/forecast/ForecastPopover/ForecastPopover'
import {maxInt} from '@lib/util'
import {
  ForecastContext,
  setActiveCycleForecastId,
  setCycleTimeoutId
} from '../ForecastStore'
import useTimeoutId from '@hooks/useTimeoutId'
import ReactCSSTransitionReplace from 'react-css-transition-replace'
import {forecastCrossFadeDuration} from '@pages/_app'

type Props = {
  cycleInterval?: number
  forecasts?: ForecastDataset[]
} & Partial<BoxProps>

const ForecastCycle = ({
  forecasts = [],
  cycleInterval = 1000 * 10, // 10 seconds
  ...rest
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const forecastContext = useContext(ForecastContext)
  const forecastDispatch = forecastContext.dispatch
  const {activeCycleForecastId, cycleTimeoutId} = forecastContext.state

  const intervalHandler = useCallback(() => {
    // We need to get the current state each time to properly increment active forecast.
    const newId =
      activeCycleForecastId >= maxInt(forecasts, 'id')
        ? 1
        : activeCycleForecastId + 1
    forecastDispatch(setActiveCycleForecastId(newId))
  }, [forecastDispatch, forecasts, activeCycleForecastId])

  const timeoutId = useTimeoutId(intervalHandler, cycleInterval)

  useEffect(() => {
    // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
    if (cycleTimeoutId) {
      return
    } else if (!timeoutId) {
      return
    } else {
      forecastDispatch(setCycleTimeoutId(timeoutId))
    }
  }, [cycleTimeoutId, timeoutId, forecastDispatch])

  const activeForecast = useCallback(
    () => forecasts.find((forecast) => forecast.id === activeCycleForecastId),
    [forecasts, activeCycleForecastId]
  )

  const handlePopoverOpen = useCallback((event: any) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const forecast = useMemo(() => activeForecast(), [activeForecast])

  const hasAnchorEl = useMemo(() => Boolean(anchorEl), [anchorEl])

  const [transitionEnter, setTransitionEnter] = useState<boolean>(false)
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
        transitionName="forecast-cross-fade"
        transitionEnterTimeout={
          !transitionEnter
            ? forecastCrossFadeDuration * 0.1
            : forecastCrossFadeDuration
        }
        transitionLeaveTimeout={forecastCrossFadeDuration}
        onTransitionEnd={transitionLeaveHandler}
      >
        {forecast && forecast.id ? (
          <ForecastDisplay key={forecast.id} forecast={forecast} />
        ) : null}
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
