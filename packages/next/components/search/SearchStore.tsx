import React, {createContext, useReducer} from 'react'
import {GoogleCseItem, GoogleCseResponse} from './SearchResponse'

interface State {
  isSearching: boolean
  dialogOpen: boolean
  results: GoogleCseItem[]
  response: GoogleCseResponse | null
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  isSearching: false,
  dialogOpen: false,
  results: [],
  response: null
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const SearchContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_IS_SEARCHING: 'SET_IS_SEARCHING' = 'SET_IS_SEARCHING'
const SET_DIALOG_OPEN: 'SET_DIALOG_OPEN' = 'SET_DIALOG_OPEN'
const SET_RESULTS: 'SET_RESULTS' = 'SET_RESULTS'
const SET_RESPONSE: 'SET_RESPONSE' = 'SET_RESPONSE'

// Actions
export const setIsSearching = (isSearching: State['isSearching']) => {
  return {
    type: SET_IS_SEARCHING,
    isSearching
  }
}
export const setDialogOpen = (dialogOpen: State['dialogOpen']) => {
  return {
    type: SET_DIALOG_OPEN,
    dialogOpen
  }
}
export const setResults = (results: State['results']) => {
  return {
    type: SET_RESULTS,
    results
  }
}
export const setResponse = (response: State['response']) => {
  return {
    type: SET_RESPONSE,
    response
  }
}

// Reducer
const searchReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.isSearching
      }
    case SET_DIALOG_OPEN:
      return {
        ...state,
        dialogOpen: action.dialogOpen
      }
    case SET_RESULTS: {
      const newResults =
        action.results && Array.isArray(action.results)
          ? [...action.results]
          : []
      return {
        ...state,
        results: [...newResults]
      }
    }
    // Don't need items in response since we are saving those in "results".
    case SET_RESPONSE: {
      const newResponse = action.response ? {...action.response} : {}
      return {
        ...state,
        response: {...newResponse, items: []}
      }
    }
    default:
      return state
  }
}

// Provider
const SearchProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)
  const value = {state, dispatch}
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider
