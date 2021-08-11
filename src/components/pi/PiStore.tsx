import React, {createContext, useReducer, Dispatch} from 'react'
import {PiWebElementAttributeStream} from '@lib/services/pi/pi-web-api-types'
import {subWeeks} from 'date-fns'
import {GageConfigItem} from '@lib/services/pi/gage-config'

export interface AttributeStream {
  attribute: string
  index: number
  items: PiWebElementAttributeStream['Items']
  units: string
}

interface State {
  activeGageItem?: GageConfigItem
  chartStartDate: Date
  chartEndDate: Date
}

type ProviderProps = {
  children: React.ReactNode
}

export interface PiMetadata {
  name: string
  value: number | string
}

// Not sure if cloning date is necessary for Context but it seems like a clean/immutable approach.
const cloneDate = (d: Date) => new Date(d.getTime())

const initialChartStartDate = subWeeks(new Date(), 1)
const initialChartEndDate = new Date()

// State
const initialState: State = {
  chartStartDate: initialChartStartDate,
  chartEndDate: initialChartEndDate
  // chartInterval: calcInterval(initialChartStartDate, initialChartEndDate)
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const PiContext = createContext<{
  state: State
  dispatch: Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_ACTIVE_GAGE_ITEM: 'SET_ACTIVE_GAGE_ITEM',
  SET_CHART_START_DATE: 'SET_CHART_START_DATE',
  SET_CHART_END_DATE: 'SET_CHART_END_DATE'
} as const

// Actions
export const setActiveGageItem = (item: State['activeGageItem']) => {
  return {
    type: Type.SET_ACTIVE_GAGE_ITEM,
    item
  }
}

export const setChartStartDate = (startDate: Date) => {
  return {
    type: Type.SET_CHART_START_DATE,
    startDate
  }
}

export const setChartEndDate = (endDate: Date) => {
  return {
    type: Type.SET_CHART_END_DATE,
    endDate
  }
}

// Reducer
const piReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_ACTIVE_GAGE_ITEM:
      return {
        ...state,
        activeGageItem: {...action.item}
      }
    case Type.SET_CHART_START_DATE:
      return {
        ...state,
        chartStartDate: cloneDate(action.startDate)
        // chartInterval: calcInterval(action.startDate, state.chartEndDate)
      }
    case Type.SET_CHART_END_DATE:
      return {
        ...state,
        chartEndDate: cloneDate(action.endDate)
        // chartInterval: calcInterval(state.chartStartDate, action.endDate)
      }
    default:
      return state
  }
}

// Provider
const PiProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(piReducer, initialState)
  const value = {state, dispatch}
  return <PiContext.Provider value={value}>{children}</PiContext.Provider>
}

export default PiProvider
