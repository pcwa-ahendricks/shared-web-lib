// cspell:ignore lightbox
import React, {createContext, useReducer} from 'react'

interface State {
  newsReleaseYear?: number
}

type ProviderProps = {
  children: React.ReactNode
}

// State
const initialState: State = {
  // newsReleaseYear: 2000
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const NewsroomContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_NEWS_RELEASE_YEAR: 'SET_NEWS_RELEASE_YEAR' = 'SET_NEWS_RELEASE_YEAR'

// Actions
export const setNewsReleaseYear = (year: State['newsReleaseYear']) => {
  return {
    type: SET_NEWS_RELEASE_YEAR,
    year
  }
}

// Reducer
const newsroomReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_NEWS_RELEASE_YEAR:
      return {
        ...state,
        newsReleaseYear: action.year
      }

    default:
      return state
  }
}

// Provider
const NewsroomProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(newsroomReducer, initialState)
  const value = {state, dispatch}
  return (
    <NewsroomContext.Provider value={value}>
      {children}
    </NewsroomContext.Provider>
  )
}

export default NewsroomProvider
