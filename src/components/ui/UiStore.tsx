import React, {createContext, useReducer} from 'react'
import {ErrorDialogError} from './ErrorDialog/ErrorDialog'
type ValueOf<T> = T[keyof T]
type AnimateDone = ValueOf<State['animateDone']>

export interface Alert {
  position: number
  hidden: boolean
  active: boolean
  ieOnly: boolean
}

interface State {
  drawerOpen: boolean
  error?: ErrorDialogError | null
  alerts: Alert[]
  animateDone: {
    home: boolean
    payBill: boolean
  }
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  drawerOpen: false,
  alerts: [],
  animateDone: {
    home: false,
    payBill: false
  }
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
  SET_DRAWER_VIZ: 'SET_DRAWER_VIZ',
  SET_ALERT_HIDDEN: 'SET_ALERT_HIDDEN',
  SET_ALERT_ACTIVE: 'SET_ALERT_ACTIVE',
  ADD_ALERT: 'ADD_ALERT',
  SET_ANIMATE_DONE: 'SET_ANIMATE_DONE'
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

export const setAlertHidden = ({
  position,
  hidden
}: {
  position: number
  hidden: boolean
}) => {
  return {
    type: Type.SET_ALERT_HIDDEN,
    payload: {position, hidden}
  }
}

export const setAlertActive = ({
  position,
  active
}: {
  position: number
  active: boolean
}) => {
  return {
    type: Type.SET_ALERT_ACTIVE,
    payload: {position, active}
  }
}

export const addAlert = ({
  position,
  active = true,
  hidden = false,
  ieOnly = false
}: {
  position: number
  active?: boolean
  hidden?: boolean
  ieOnly?: boolean
}) => {
  return {
    type: Type.ADD_ALERT,
    payload: {position, active, hidden, ieOnly}
  }
}

export const setAnimateDone = (
  key: keyof State['animateDone'],
  done: AnimateDone
) => {
  return {
    type: Type.SET_ANIMATE_DONE,
    done,
    key
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
    case Type.SET_ALERT_HIDDEN: {
      const {alerts: currentAlerts} = state
      const alertIndex = currentAlerts.findIndex(
        (alert) => alert.position === action.payload.position
      )
      const updateAlert = currentAlerts.splice(alertIndex, 1).shift()
      if (updateAlert) {
        updateAlert.hidden = action.payload.hidden
        return {
          ...state,
          alerts: [...currentAlerts, {...updateAlert}]
        }
      } else {
        return {
          ...state,
          alerts: [...currentAlerts]
        }
      }
    }
    case Type.SET_ALERT_ACTIVE: {
      const {alerts} = state
      const alertIndex = alerts.findIndex(
        (alert) => alert.position === action.payload.position
      )
      const updateAlert = alerts.splice(alertIndex, 1).shift()
      if (updateAlert) {
        updateAlert.active = action.payload.active
        return {
          ...state,
          alerts: [...alerts, {...updateAlert}]
        }
      } else {
        return {
          ...state,
          alerts: [...alerts]
        }
      }
    }
    case Type.ADD_ALERT: {
      const {alerts} = state
      const {payload} = action || {}
      // Don't add alert if an alert already exists at that position.
      const alertIndex = alerts.findIndex(
        (alert) => alert.position === action.payload.position
      )
      if (alertIndex >= 0) {
        return {
          ...state
        }
      } else {
        return {
          ...state,
          alerts: [...alerts, {...payload}]
        }
      }
    }
    case Type.SET_ANIMATE_DONE:
      return {
        ...state,
        animateDone: {
          ...state.animateDone,
          [action.key]: action.done
        }
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
