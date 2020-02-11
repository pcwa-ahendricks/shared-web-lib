// cspell:ignore mediachimp
import React, {createContext, useReducer} from 'react'

interface State {
  recentNews: RecentNews
}

type ProviderProps = {
  children: React.ReactNode
}

export interface NewsBlurbMetadata {
  linkURL?: string
  releaseDate: string
  title: string
  summary: string
  hide: boolean
  readMoreCaption: string
}

export interface NewsBlurb {
  id: string // Cosmic _id
  linkURL?: string
  releaseDate: Date // Will parse Cosmic string as Date object
  title: string
  summary: string
  hide: boolean
  readMoreCaption: string
}

export type RecentNews = NewsBlurb[]

// State
const initialState: State = {
  recentNews: []
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const RecentNewsContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_RECENT_NEWS: 'SET_RECENT_NEWS' = 'SET_RECENT_NEWS'

// Actions
export const setRecentNews = (recentNews: State['recentNews']) => {
  return {
    type: SET_RECENT_NEWS,
    recentNews
  }
}

// Reducer
const recentNewsReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_RECENT_NEWS:
      return {
        ...state,
        recentNews: [...action.recentNews]
      }
    default:
      return state
  }
}

// Provider
const RecentNewsProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(recentNewsReducer, initialState)
  const value = {state, dispatch}
  return (
    <RecentNewsContext.Provider value={value}>
      {children}
    </RecentNewsContext.Provider>
  )
}

export default RecentNewsProvider
