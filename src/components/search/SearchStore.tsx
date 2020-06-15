import React, {createContext, useReducer} from 'react'
import {GoogleCseItem, GoogleCseResponse} from './SearchResponse'

interface State {
  isSearching: boolean
  isPaging: boolean
  isIterating: boolean
  dialogOpen: boolean
  results: GoogleCseItem[]
  response: GoogleCseResponse | null
  betterTotalItems: number
  inputMobFocused: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  isSearching: false,
  isPaging: false,
  dialogOpen: false,
  results: [],
  response: null,
  betterTotalItems: 0,
  isIterating: false,
  inputMobFocused: false
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const SearchContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_INPUT_MOB_FOCUSED: 'SET_INPUT_MOB_FOCUSED',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  SET_IS_PAGING: 'SET_IS_PAGING',
  SET_IS_ITERATING: 'SET_IS_ITERATING',
  SET_DIALOG_OPEN: 'SET_DIALOG_OPEN',
  SET_RESULTS: 'SET_RESULTS',
  SET_RESPONSE: 'SET_RESPONSE',
  SET_BETTER_TOTAL_ITEMS: 'SET_BETTER_TOTAL_ITEMS'
} as const

// Actions
export const setIsSearching = (isSearching: State['isSearching']) => {
  return {
    type: Type.SET_IS_SEARCHING,
    isSearching
  }
}
export const setIsPaging = (isPaging: State['isPaging']) => {
  return {
    type: Type.SET_IS_PAGING,
    isPaging
  }
}
export const setIsIterating = (isIterating: State['isIterating']) => {
  return {
    type: Type.SET_IS_ITERATING,
    isIterating
  }
}
export const setDialogOpen = (dialogOpen: State['dialogOpen']) => {
  return {
    type: Type.SET_DIALOG_OPEN,
    dialogOpen
  }
}
export const setResults = (results: State['results']) => {
  return {
    type: Type.SET_RESULTS,
    results
  }
}
export const setResponse = (response: State['response']) => {
  return {
    type: Type.SET_RESPONSE,
    response
  }
}
export const setBetterTotalItems = (
  betterTotalItems: State['betterTotalItems']
) => {
  return {
    type: Type.SET_BETTER_TOTAL_ITEMS,
    betterTotalItems
  }
}
export const setInputMobFocused = (isFocused: State['inputMobFocused']) => {
  return {
    type: Type.SET_INPUT_MOB_FOCUSED,
    isFocused
  }
}

// Reducer
const searchReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_IS_SEARCHING:
      return {
        ...state,
        isSearching: action.isSearching
      }
    case Type.SET_IS_PAGING:
      return {
        ...state,
        isPaging: action.isPaging
      }
    case Type.SET_IS_ITERATING:
      return {
        ...state,
        isIterating: action.isIterating
      }
    case Type.SET_DIALOG_OPEN:
      return {
        ...state,
        dialogOpen: action.dialogOpen
      }
    case Type.SET_RESULTS: {
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
    case Type.SET_RESPONSE: {
      const newResponse = action.response ? {...action.response} : {}
      return {
        ...state,
        response: {...newResponse, items: []}
      }
    }
    case Type.SET_BETTER_TOTAL_ITEMS:
      return {
        ...state,
        betterTotalItems: action.betterTotalItems
      }
    case Type.SET_INPUT_MOB_FOCUSED:
      return {
        ...state,
        inputMobFocused: action.isFocused
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
