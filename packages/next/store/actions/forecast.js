// @flow
import {fetchForecasts} from '../../lib/services/forecastService'
import {
  SET_FORECASTS,
  SET_TIMEOUT_ID,
  SET_ACTIVE_CYCLE_FORECAST_ID,
  SET_CYCLE_TIMEOUT_ID
} from './actionTypes'
import {type State} from '../index'
import {type ForecastData} from '../../components/Forecast/ForecastDisplay/ForecastDisplay'
import {maxInt} from '../../lib/util'

const setForecasts = (forecasts: Array<ForecastData>) => {
  return {
    type: SET_FORECASTS,
    forecasts
  }
}

const setTimeoutId = (timeoutId: IntervalID) => {
  return {
    type: SET_TIMEOUT_ID,
    timeoutId
  }
}

const setActiveCycleForecastId = (activeCycleForecastId: number) => {
  return {
    type: SET_ACTIVE_CYCLE_FORECAST_ID,
    activeCycleForecastId
  }
}

const setCycleTimeoutId = (cycleTimeoutId: IntervalID) => {
  return {
    type: SET_CYCLE_TIMEOUT_ID,
    cycleTimeoutId
  }
}

// Thunks

export const startForecastTimer = (
  forecastLocations: Array<any>,
  interval: number
) => async (dispatch: any, getState: () => State) => {
  const {forecast} = getState()
  const {timeoutId} = forecast || {}
  // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
  if (timeoutId) {
    return
  }
  // Get initial forecasts before starting timer.
  const data = await getForecastData(forecastLocations)
  dispatch(setForecasts(data))
  const newTimeoutId = setInterval(async () => {
    const data = await getForecastData(forecastLocations)
    dispatch(setForecasts(data))
  }, interval)
  return dispatch(setTimeoutId(newTimeoutId))
}

const getForecastData = async (forecastLocations) => {
  return await fetchForecasts(forecastLocations)
}

export const startCycleForecastTimer = (
  forecasts: Array<any>,
  interval: number
) => async (dispatch: any, getState: () => State) => {
  const {forecast} = getState()
  const {cycleTimeoutId} = forecast || {}
  // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
  if (cycleTimeoutId) {
    return
  }
  const newTimeoutId = setInterval(async () => {
    // We need to get the current state each time.
    const {forecast} = getState()
    const {activeCycleForecastId} = forecast || {}
    dispatch(
      setActiveCycleForecastId(
        activeCycleForecastId >= maxInt(forecasts, 'id')
          ? 1
          : activeCycleForecastId + 1
      )
    )
  }, interval)
  return dispatch(setCycleTimeoutId(newTimeoutId))
}
