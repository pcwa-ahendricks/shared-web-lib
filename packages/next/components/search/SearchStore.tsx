import React, {createContext, useReducer} from 'react'
import {GoogleCseItem} from './SearchResponse'

interface State {
  isSearching: boolean
  dialogOpen: boolean
  results: GoogleCseItem[]
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  isSearching: false,
  dialogOpen: false,
  results: []
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

// Reducer
const searchReducer = (state: State, action: any) => {
  switch (action.type) {
    case SET_IS_SEARCHING:
      return {
        ...state,
        isUploading: action.isSearching
      }
    case SET_DIALOG_OPEN:
      return {
        ...state,
        dialogOpen: action.dialogOpen
      }
    case SET_RESULTS:
      return {
        ...state,
        results: [...action.results]
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
