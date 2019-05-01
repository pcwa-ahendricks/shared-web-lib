import {fetchForecasts} from '@lib/services/forecastService'
import {
  SET_FORECASTS,
  SET_TIMEOUT_ID,
  SET_ACTIVE_CYCLE_FORECAST_ID,
  SET_CYCLE_TIMEOUT_ID
} from './actionTypes'
import {State} from '../index'
import {ForecastData} from '@components/forecast/ForecastDisplay/ForecastDisplay'
import {maxInt} from '@lib/util'

const setForecasts = (forecasts: Array<ForecastData>) => {
  return {
    type: SET_FORECASTS,
    forecasts
  }
}

const setTimeoutId = (timeoutId: number) => {
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

const setCycleTimeoutId = (cycleTimeoutId: number) => {
  return {
    type: SET_CYCLE_TIMEOUT_ID,
    cycleTimeoutId
  }
}

// Thunks

export const startForecastTimer = (
  forecastLocations: Array<any>,
  interval: number
) => (dispatch: any, getState: () => State) => {
  const {forecast} = getState()
  const {timeoutId} = forecast || {}
  // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
  if (timeoutId) {
    return
  }
  // Get initial forecasts before starting timer.
  const getDataAndSetData = async () => {
    try {
      const data = await fetchForecasts(forecastLocations)
      dispatch(setForecasts(data))
    } catch (error) {
      console.log(error)
    }
  }
  getDataAndSetData()
  const newTimeoutId = setInterval(() => {
    getDataAndSetData()
  }, interval)
  dispatch(setTimeoutId(newTimeoutId))
}

export const startCycleForecastTimer = (
  forecasts: Array<any>,
  interval: number
) => (dispatch: any, getState: () => State) => {
  const {forecast} = getState()
  const {cycleTimeoutId} = forecast || {}
  // Don't set timeout interval if it's already set. Note - Timer will run for lifetime of App. There is no clearInterval function for removing the timer.
  if (cycleTimeoutId) {
    return
  }
  const newTimeoutId = setInterval(() => {
    // We need to get the current state each time to properly increment active forecast.
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
  dispatch(setCycleTimeoutId(newTimeoutId))
}
