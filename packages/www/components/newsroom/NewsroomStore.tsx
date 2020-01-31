// cspell:ignore lightbox
import React, {createContext, useReducer} from 'react'
import {CosmicMediaMeta} from '@lib/services/cosmicService'

interface State {
  newsReleaseYear?: number
  newsReleases: GroupedNewsReleases
}

type ProviderProps = {
  children: React.ReactNode
}

export type GroupedNewsReleases = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'url' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

// State
const initialState: State = {
  newsReleases: []
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
const SET_NEWS_RELEASES: 'SET_NEWS_RELEASES' = 'SET_NEWS_RELEASES'

// Actions
export const setNewsReleaseYear = (year: State['newsReleaseYear']) => {
  return {
    type: SET_NEWS_RELEASE_YEAR,
    year
  }
}

export const setNewsReleases = (newsReleases: State['newsReleases']) => {
  return {
    type: SET_NEWS_RELEASES,
    newsReleases
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
    case SET_NEWS_RELEASES:
      return {
        ...state,
        newsReleases: action.newsReleases
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
