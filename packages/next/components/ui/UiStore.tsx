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
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_ERROR: 'SET_ERROR' = 'SET_ERROR'
const DISMISS_ERROR: 'DISMISS_ERROR' = 'DISMISS_ERROR'
const SET_DRAWER_VIZ: 'SET_DRAWER_VIZ' = 'SET_DRAWER_VIZ'

// Actions
export const uiSetDrawerViz = (open: State['drawerOpen']) => {
  return {
    type: SET_DRAWER_VIZ,
    open
  }
}

export const uiSetError = (error: State['error']) => {
  return {
    type: SET_ERROR,
    error
  }
}

export const uiDismissError = () => {
  return {
    type: DISMISS_ERROR
  }
}

// Reducer
const uiReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_DRAWER_VIZ:
      return {
        ...state,
        drawerOpen: action.open
      }
    case SET_ERROR:
      return {
        ...state,
        error: {...action.error}
      }
    case DISMISS_ERROR:
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
