import React, {createContext, useReducer} from 'react'
import {ErrorDialogError} from './ErrorDialog/ErrorDialog'

interface State {
  drawerOpen: boolean
  error?: ErrorDialogError | null
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  drawerOpen: false
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const UiContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_ERROR: 'SET_ERROR',
  DISMISS_ERROR: 'DISMISS_ERROR',
  SET_DRAWER_VIZ: 'SET_DRAWER_VIZ'
} as const

// Actions
export const setDrawerViz = (open: State['drawerOpen']) => {
  return {
    type: Type.SET_DRAWER_VIZ,
    open
  }
}

export const setError = (error: State['error']) => {
  return {
    type: Type.SET_ERROR,
    error
  }
}

export const dismissError = () => {
  return {
    type: Type.DISMISS_ERROR
  }
}

// Reducer
const uiReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_DRAWER_VIZ:
      return {
        ...state,
        drawerOpen: action.open
      }
    case Type.SET_ERROR:
      return {
        ...state,
        error: {...action.error}
      }
    case Type.DISMISS_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state
  }
}

// Provider
const UiProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(uiReducer, initialState)
  const value = {state, dispatch}
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

export default UiProvider
