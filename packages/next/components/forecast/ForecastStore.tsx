import React, {createContext, useReducer} from 'react'
import {ForecastData} from '@components/forecast/ForecastDisplay/ForecastDisplay'

interface State {
  forecasts: ForecastData[]
  timeoutId: NodeJS.Timeout | null
  activeCycleForecastId: number
  cycleTimeoutId: NodeJS.Timeout | null
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  forecasts: [],
  timeoutId: null,
  activeCycleForecastId: 1,
  cycleTimeoutId: null
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const ForecastContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_FORECASTS: 'FORECAST/SET_FORECASTS' = 'FORECAST/SET_FORECASTS'
const SET_TIMEOUT_ID: 'FORECAST/SET_TIMEOUT_ID' = 'FORECAST/SET_TIMEOUT_ID'
const SET_ACTIVE_CYCLE_FORECAST_ID: 'FORECAST/SET_ACTIVE_CYCLE_FORECAST_ID' =
  'FORECAST/SET_ACTIVE_CYCLE_FORECAST_ID'
const SET_CYCLE_TIMEOUT_ID: 'FORECAST/SET_CYCLE_TIMEOUT_ID' =
  'FORECAST/SET_CYCLE_TIMEOUT_ID'

// Actions
export const setForecasts = (forecasts: State['forecasts']) => {
  return {
    type: SET_FORECASTS,
    forecasts
  }
}

export const setTimeoutId = (timeoutId: State['timeoutId']) => {
  return {
    type: SET_TIMEOUT_ID,
    timeoutId
  }
}

export const setActiveCycleForecastId = (
  activeCycleForecastId: State['activeCycleForecastId']
) => {
  return {
    type: SET_ACTIVE_CYCLE_FORECAST_ID,
    activeCycleForecastId
  }
}

export const setCycleTimeoutId = (cycleTimeoutId: State['cycleTimeoutId']) => {
  return {
    type: SET_CYCLE_TIMEOUT_ID,
    cycleTimeoutId
  }
}

// Reducer
const forecastReducer = (state: State, action: any): State => {
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

// Provider
const ForecastProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(forecastReducer, initialState)
  const value = {state, dispatch}
  return (
    <ForecastContext.Provider value={value}>
      {children}
    </ForecastContext.Provider>
  )
}

export default ForecastProvider
