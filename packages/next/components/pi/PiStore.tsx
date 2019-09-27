import React, {createContext, useReducer, Dispatch} from 'react'
import {
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from '@lib/services/pi/pi-web-api-types'
import {differenceInDays, subWeeks} from 'date-fns'
import {GageConfigItem} from '@lib/services/pi/gage-config'

interface State {
  activeGageItem?: GageConfigItem
  streamSetItems: PiWebElementStreamSetResponse['Items']
  isLoadingStreamSetItems: boolean
  streamSetMeta: PiMetadata[]
  attributeStreams: {
    attribute: string
    index: number
    items: PiWebElementAttributeStream['Items']
  }[]
  startDate: Date
  endDate: Date
  interval: string
}

type ProviderProps = {
  children: React.ReactNode
}

export interface PiMetadata {
  name: string
  value: number | string
}

const calcInterval = (startDate: Date, endDate: Date) => {
  const diffInDays = differenceInDays(endDate, startDate)
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
  streamSetMeta: [],
  isLoadingStreamSetItems: false,
  attributeStreams: [],
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
const SET_ACTIVE_GAGE_ITEM: 'SET_ACTIVE_GAGE_ITEM' = 'SET_ACTIVE_GAGE_ITEM'
const SET_STREAM_SET_ITEMS: 'SET_STREAM_SET_ITEMS' = 'SET_STREAM_SET_ITEMS'
const SET_IS_LOADING_STREAM_SET_ITEMS: 'SET_IS_LOADING_STREAM_SET_ITEMS' =
  'SET_IS_LOADING_STREAM_SET_ITEMS'
// const SET_INTERVAL: 'SET_INTERVAL' = 'SET_INTERVAL'
const SET_START_DATE: 'SET_START_DATE' = 'SET_START_DATE'
const SET_END_DATE: 'SET_END_DATE' = 'SET_END_DATE'
const SET_ATTRIBUTE_STREAMS: 'SET_ATTRIBUTE_STREAMS' = 'SET_ATTRIBUTE_STREAMS'
const RESET_ATTRIBUTE_STREAMS: 'RESET_ATTRIBUTE_STREAMS' =
  'RESET_ATTRIBUTE_STREAMS'

// Actions
export const setActiveGageItem = (item: State['activeGageItem']) => {
  return {
    type: SET_ACTIVE_GAGE_ITEM,
    item
  }
}

export const setStreamSetItems = (items: State['streamSetItems']) => {
  return {
    type: SET_STREAM_SET_ITEMS,
    items
  }
}

export const setIsLoadingStreamSetItems = (
  isLoading: State['isLoadingStreamSetItems']
) => {
  return {
    type: SET_IS_LOADING_STREAM_SET_ITEMS,
    isLoading
  }
}

export const setAttributeStreams = (
  attribute: string,
  index: number,
  items: PiWebElementAttributeStream['Items']
) => {
  return {
    type: SET_ATTRIBUTE_STREAMS,
    items,
    index,
    attribute
  }
}

export const resetAttributeStreams = () => {
  return {
    type: RESET_ATTRIBUTE_STREAMS
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
    case SET_ACTIVE_GAGE_ITEM:
      return {
        ...state,
        activeGageItem: {...action.item}
      }
    case SET_STREAM_SET_ITEMS: {
      const streamSetItems: State['streamSetItems'] = [...action.items]
      const names = streamSetItems.map((item) => item.Name)
      const values = streamSetItems.map((item) => item.Value)
      // If we need to filter "Questionable" data this is where we would start, at least for the streamSetMeta.
      const streamSetMeta = names.map((e, idx) => {
        return {name: e, value: values[idx].Value}
      })
      console.log('Zipped metadata: ', streamSetMeta)
      return {
        ...state,
        streamSetItems,
        streamSetMeta
      }
    }
    case SET_IS_LOADING_STREAM_SET_ITEMS:
      return {
        ...state,
        isLoadingStreamSetItems: action.isLoading
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
    case SET_ATTRIBUTE_STREAMS:
      return {
        ...state,
        attributeStreams: [
          ...state.attributeStreams,
          {
            attribute: action.attribute,
            items: [...action.items],
            index: action.index
          }
        ]
      }
    case RESET_ATTRIBUTE_STREAMS:
      return {
        ...state,
        attributeStreams: []
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
