import React, {createContext, useReducer} from 'react'

interface State {
  activeCycleForecastId: number
  cycleTimeoutId: NodeJS.Timeout | null
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  activeCycleForecastId: 1,
  cycleTimeoutId: null
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const ForecastContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_ACTIVE_CYCLE_FORECAST_ID: 'SET_ACTIVE_CYCLE_FORECAST_ID',
  SET_CYCLE_TIMEOUT_ID: 'SET_CYCLE_TIMEOUT_ID'
} as const

// Actions

export const setActiveCycleForecastId = (
  activeCycleForecastId: State['activeCycleForecastId']
) => {
  return {
    type: Type.SET_ACTIVE_CYCLE_FORECAST_ID,
    activeCycleForecastId
  }
}

export const setCycleTimeoutId = (cycleTimeoutId: State['cycleTimeoutId']) => {
  return {
    type: Type.SET_CYCLE_TIMEOUT_ID,
    cycleTimeoutId
  }
}

// Reducer
const forecastReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_ACTIVE_CYCLE_FORECAST_ID:
      return {
        ...state,
        activeCycleForecastId: action.activeCycleForecastId
      }
    case Type.SET_CYCLE_TIMEOUT_ID:
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
