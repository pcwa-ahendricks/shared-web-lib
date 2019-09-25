import React, {createContext, useReducer, Dispatch} from 'react'
import {PiWebElementStreamSetResponse} from '@lib/services/pi/pi-web-api-types'

interface State {
  streamSetItems: PiWebElementStreamSetResponse['Items']
  canFetchAttributeStream: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  streamSetItems: [],
  canFetchAttributeStream: true
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
