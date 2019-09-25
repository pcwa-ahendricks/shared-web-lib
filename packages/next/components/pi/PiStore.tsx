import React, {createContext, useReducer, Dispatch} from 'react'
import {PiWebElementStreamSetResponse} from '@lib/services/pi/pi-web-api-types'
import {differenceInDays, subWeeks} from 'date-fns'

interface State {
  streamSetItems: PiWebElementStreamSetResponse['Items']
  canFetchAttributeStream: boolean
  startDate: Date
  endDate: Date
  interval: string
}

type ProviderProps = {
  children: React.ReactNode
}

const calcInterval = (startDate: Date, endDate: Date) => {
  const diffInDays = differenceInDays(startDate, endDate)
  switch (true) {
    // Day
    case diffInDays <= 1:
      return '1m' // 1 minute interval.
    // Week
    case diffInDays <= 7:
      return '15m' // 15 minute interval.
    // Month
    case diffInDays <= 32:
      return '1h' // 1 hour interval.
    // Quarter
    case diffInDays <= 92:
      return '8h' // 8 hour interval.
    // Semi-Annual
    case diffInDays <= 183:
      return '12h' // 12 hour interval.
    default:
      return '1d' // 1 day interval
  }
}

// Not sure if cloning date is necessary for Context but it seems like a clean/immutable approach.
const cloneDate = (d: Date) => new Date(d.getTime())

const initialStartDate = subWeeks(new Date(), 1)
const initialEndDate = new Date()

// State
const initialState: State = {
  streamSetItems: [],
  canFetchAttributeStream: true,
  startDate: initialStartDate,
  endDate: initialEndDate,
  interval: calcInterval(initialStartDate, initialEndDate)
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const PiContext = createContext<{
  state: State
  dispatch: Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_STREAM_SET_ITEMS: 'SET_STREAM_SET_ITEMS' = 'SET_STREAM_SET_ITEMS'
const CAN_FETCH_ATTRIBUTE_STREAM: 'CAN_FETCH_ATTRIBUTE_STREAM' =
  'CAN_FETCH_ATTRIBUTE_STREAM'
// const SET_INTERVAL: 'SET_INTERVAL' = 'SET_INTERVAL'
const SET_START_DATE: 'SET_START_DATE' = 'SET_START_DATE'
const SET_END_DATE: 'SET_END_DATE' = 'SET_END_DATE'

// Actions
export const setStreamSetItems = (items: State['streamSetItems']) => {
  return {
    type: SET_STREAM_SET_ITEMS,
    items
  }
}

export const setCanFetchAttributeStream = (
  canFetch: State['canFetchAttributeStream']
) => {
  return {
    type: CAN_FETCH_ATTRIBUTE_STREAM,
    canFetch
  }
}

// const setInterval = ...

export const setStartDate = (startDate: Date) => {
  return {
    type: SET_START_DATE,
    startDate
  }
}

export const setEndDate = (endDate: Date) => {
  return {
    type: SET_END_DATE,
    endDate
  }
}

// Reducer
const piReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_STREAM_SET_ITEMS:
      return {
        ...state,
        streamSetItems: [...action.items]
      }
    case CAN_FETCH_ATTRIBUTE_STREAM:
      return {
        ...state,
        canFetchAttributeStream: action.canFetch
      }
    case SET_START_DATE:
      return {
        ...state,
        startDate: cloneDate(action.startDate),
        interval: calcInterval(action.startDate, state.endDate)
      }
    case SET_END_DATE:
      return {
        ...state,
        endDate: cloneDate(action.endDate),
        interval: calcInterval(state.startDate, action.endDate)
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
