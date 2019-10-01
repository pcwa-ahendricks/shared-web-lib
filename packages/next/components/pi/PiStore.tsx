import React, {createContext, useReducer, Dispatch} from 'react'
import {
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from '@lib/services/pi/pi-web-api-types'
import {differenceInDays, subWeeks} from 'date-fns'
import {GageConfigItem} from '@lib/services/pi/gage-config'

export interface AttributeStream {
  attribute: string
  index: number
  items: PiWebElementAttributeStream['Items']
  units: string
}

interface State {
  activeGageItem?: GageConfigItem
  streamSetItems: PiWebElementStreamSetResponse['Items']
  isLoadingStreamSetItems: boolean
  streamSetMeta: PiMetadata[]
  attributeStreams: AttributeStream[]
  isLoadingAttributeStreams: boolean
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
  isLoadingStreamSetItems: false,
  streamSetMeta: [],
  attributeStreams: [],
  isLoadingAttributeStreams: false,
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
const UPDATE_ATTRIBUTE_STREAMS: 'UPDATE_ATTRIBUTE_STREAMS' =
  'UPDATE_ATTRIBUTE_STREAMS'
const RESET_ATTRIBUTE_STREAMS: 'RESET_ATTRIBUTE_STREAMS' =
  'RESET_ATTRIBUTE_STREAMS'
const SET_IS_LOADING_ATTRIBUTE_STREAMS: 'SET_IS_LOADING_ATTRIBUTE_STREAMS' =
  'SET_IS_LOADING_ATTRIBUTE_STREAMS'

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

export const setAttributeStreams = (attribStream: AttributeStream) => {
  return {
    type: SET_ATTRIBUTE_STREAMS,
    attribStream
  }
}

export const updateAttributeStreams = (attribStream: AttributeStream) => {
  return {
    type: UPDATE_ATTRIBUTE_STREAMS,
    attribStream
  }
}

export const resetAttributeStreams = () => {
  return {
    type: RESET_ATTRIBUTE_STREAMS
  }
}

export const setIsLoadingAttributeStreams = (
  isLoading: State['isLoadingAttributeStreams']
) => {
  return {
    type: SET_IS_LOADING_ATTRIBUTE_STREAMS,
    isLoading
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
      // Zip up metadata. If we need to filter "Questionable" data this is where we would start, at least for the streamSetMeta.
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
        attributeStreams: [...state.attributeStreams, {...action.attribStream}]
      }
    case UPDATE_ATTRIBUTE_STREAMS: {
      const {attribute, index, items, units} = action.attribStream
      const attributeStreams = [...state.attributeStreams]
      const idx = state.attributeStreams.findIndex(
        (stream) => stream.index === index
      )
      if (!(idx >= 0)) {
        return {...state}
      }
      // Method using slice, which isn't necessary here.
      // const otherStreams = [
      //   ...attributeStreams.slice(0, idx),
      //   ...attributeStreams.slice(idx + 1)
      // ]
      // const updateStream = {...attributeStreams[idx], items, units, attribute}

      attributeStreams[idx] = {
        index,
        items,
        units,
        attribute
      }
      return {
        ...state,
        attributeStreams
        // attributeStreams: [...otherStreams, {...updateStream}]
      }
    }
    case RESET_ATTRIBUTE_STREAMS:
      return {
        ...state,
        attributeStreams: []
      }
    case SET_IS_LOADING_ATTRIBUTE_STREAMS:
      return {
        ...state,
        isLoadingAttributeStreams: action.isLoading
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
