import {
  SET_FORECASTS,
  SET_TIMEOUT_ID,
  SET_ACTIVE_CYCLE_FORECAST_ID,
  SET_CYCLE_TIMEOUT_ID
} from '../actions/actionTypes'
import {ForecastData} from '@components/forecast/ForecastDisplay/ForecastDisplay'

export type State = {
  forecasts: ForecastData[]
  timeoutId: NodeJS.Timeout | null
  activeCycleForecastId: number
  cycleTimeoutId: NodeJS.Timeout | null
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
