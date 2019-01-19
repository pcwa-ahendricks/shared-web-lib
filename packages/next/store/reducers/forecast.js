// @flow
import {
  SET_FORECASTS,
  SET_TIMEOUT_ID,
  SET_ACTIVE_CYCLE_FORECAST_ID,
  SET_CYCLE_TIMEOUT_ID
} from '../actions/actionTypes'
import {type ForecastData} from '../../components/Forecast/ForecastDisplay/ForecastDisplay'

export type State = {
  forecasts: Array<ForecastData>,
  timeoutId: ?IntervalID,
  activeCycleForecastId: number,
  cycleTimeoutId: ?IntervalID
}

export const initialState = {
  forecasts: [],
  timeoutId: null,
  activeCycleForecastId: 1,
  cycleTimeoutId: null
}

export const forecastReducer = (state: State = initialState, action: any) => {
  switch (action.type) {
    case SET_FORECASTS:
      return {
        ...state,
        forecasts: [...action.forecasts]
      }
    case SET_TIMEOUT_ID:
      return {
        ...state,
        timeoutId: action.timeoutId
      }
    case SET_ACTIVE_CYCLE_FORECAST_ID:
      return {
        ...state,
        activeCycleForecastId: action.activeCycleForecastId
      }
    case SET_CYCLE_TIMEOUT_ID:
      return {
        ...state,
        cycleTimeoutId: action.cycleTimeoutId
      }
    default:
      return state
  }
}
