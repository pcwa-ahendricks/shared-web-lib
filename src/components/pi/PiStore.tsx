import React, {createContext, useReducer, Dispatch} from 'react'
import {
  PiWebElementStreamSetResponse,
  PiWebElementAttributeStream
} from '@lib/services/pi/pi-web-api-types'
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
  streamSetItems: PiWebElementStreamSetResponse['Items']
  isLoadingStreamSetItems: boolean
  streamSetMeta: PiMetadata[]
  chartData: AttributeStream[]
  chartStartDate: Date
  chartEndDate: Date
  // chartInterval: string
  // isLoadingChartData: boolean
  tableData: AttributeStream[]
  isLoadingTableData: boolean
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
  streamSetItems: [],
  isLoadingStreamSetItems: false,
  streamSetMeta: [],
  chartData: [],
  tableData: [],
  isLoadingTableData: false,
  chartStartDate: initialChartStartDate,
  chartEndDate: initialChartEndDate
  // chartInterval: calcInterval(initialChartStartDate, initialChartEndDate)
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const PiContext = createContext<{
  state: State
  dispatch: Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_ACTIVE_GAGE_ITEM: 'SET_ACTIVE_GAGE_ITEM' = 'SET_ACTIVE_GAGE_ITEM'
const SET_STREAM_SET_ITEMS: 'SET_STREAM_SET_ITEMS' = 'SET_STREAM_SET_ITEMS'
const SET_IS_LOADING_STREAM_SET_ITEMS: 'SET_IS_LOADING_STREAM_SET_ITEMS' =
  'SET_IS_LOADING_STREAM_SET_ITEMS'
// const SET_INTERVAL: 'SET_INTERVAL' = 'SET_INTERVAL'
const SET_CHART_START_DATE: 'SET_CHART_START_DATE' = 'SET_CHART_START_DATE'
const SET_CHART_END_DATE: 'SET_CHART_END_DATE' = 'SET_CHART_END_DATE'
const SET_CHART_DATA: 'SET_CHART_DATA' = 'SET_CHART_DATA'
const SET_TABLE_DATA: 'SET_TABLE_DATA' = 'SET_TABLE_DATA'
const UPDATE_TABLE_DATA: 'UPDATE_TABLE_DATA' = 'UPDATE_TABLE_DATA'
const RESET_TABLE_DATA: 'RESET_TABLE_DATA' = 'RESET_TABLE_DATA'
const SET_IS_LOADING_TABLE_DATA: 'SET_IS_LOADING_TABLE_DATA' =
  'SET_IS_LOADING_TABLE_DATA'

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

export const setChartData = (attribStream: AttributeStream) => {
  return {
    type: SET_CHART_DATA,
    attribStream
  }
}

// const setInterval = ...

export const setChartStartDate = (startDate: Date) => {
  return {
    type: SET_CHART_START_DATE,
    startDate
  }
}

export const setChartEndDate = (endDate: Date) => {
  return {
    type: SET_CHART_END_DATE,
    endDate
  }
}

export const setTableData = (attribStream: AttributeStream) => {
  return {
    type: SET_TABLE_DATA,
    attribStream
  }
}

export const updateTableData = (attribStream: AttributeStream) => {
  return {
    type: UPDATE_TABLE_DATA,
    attribStream
  }
}

export const resetTableData = () => {
  return {
    type: RESET_TABLE_DATA
  }
}

export const setIsLoadingTableData = (
  isLoading: State['isLoadingTableData']
) => {
  return {
    type: SET_IS_LOADING_TABLE_DATA,
    isLoading
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
      // console.log('Zipped metadata: ', streamSetMeta)
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
    case SET_CHART_START_DATE:
      return {
        ...state,
        chartStartDate: cloneDate(action.startDate)
        // chartInterval: calcInterval(action.startDate, state.chartEndDate)
      }
    case SET_CHART_END_DATE:
      return {
        ...state,
        chartEndDate: cloneDate(action.endDate)
        // chartInterval: calcInterval(state.chartStartDate, action.endDate)
      }
    case SET_CHART_DATA:
      return {
        ...state,
        chartData: [...state.chartData, {...action.attribStream}]
      }
    // The following tables actions are identical to the chart actions above.
    case SET_TABLE_DATA:
      return {
        ...state,
        tableData: [...state.tableData, {...action.attribStream}]
      }
    case UPDATE_TABLE_DATA: {
      const {attribute, index, items, units} = action.attribStream
      const tableData = [...state.tableData]
      const idx = state.tableData.findIndex((stream) => stream.index === index)
      if (!(idx >= 0)) {
        return {...state}
      }
      tableData[idx] = {
        index,
        items,
        units,
        attribute
      }
      return {
        ...state,
        tableData
      }
    }
    case RESET_TABLE_DATA:
      return {
        ...state,
        tableData: []
      }
    case SET_IS_LOADING_TABLE_DATA:
      return {
        ...state,
        isLoadingTableData: action.isLoading
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
