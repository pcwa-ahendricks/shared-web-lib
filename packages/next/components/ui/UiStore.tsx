import React, {createContext, useReducer} from 'react'

interface State {
  drawerOpen: boolean
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
// const SET_ERROR: 'UI/SET_ERROR' = 'UI/SET_ERROR'
// const DISMISS_ERROR: 'UI/DISMISS_ERROR' = 'UI/DISMISS_ERROR'
const SET_DRAWER_VIZ: 'UI/SET_DRAWER_VIZ' = 'UI/SET_DRAWER_VIZ'

// Actions
export const uiSetDrawerViz = (open: boolean) => {
  return {
    type: SET_DRAWER_VIZ,
    open
  }
}

// Reducer
const uiReducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_DRAWER_VIZ:
      return {
        ...state,
        drawerOpen: action.open
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
