// cspell:ignore mediachimp
import React, {createContext, useReducer} from 'react'
import {CosmicMediaMeta} from '@lib/services/cosmicService'

interface State {
  newsReleaseYear?: number
  newsReleases: GroupedNewsReleases
  newsletterYear?: number
  newsletters: GroupedNewsletters
  enewsBlasts: EnewsBlast[]
  enewsDialogOpen: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

interface EnewsBlast {
  id: string
  title: string
  mailchimpURL: string
  distributionDate: Date
}

export type GroupedNewsletters = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

export type GroupedNewsReleases = Array<{
  year: number
  values: Pick<
    CosmicMediaMeta,
    '_id' | 'original_name' | 'url' | 'imgix_url' | 'derivedFilenameAttr'
  >[]
}>

// State
const initialState: State = {
  newsReleases: [],
  newsletters: [],
  enewsBlasts: [],
  enewsDialogOpen: false
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
const SET_NEWSLETTER_YEAR: 'SET_NEWSLETTER_YEAR' = 'SET_NEWSLETTER_YEAR'
const SET_NEWSLETTERS: 'SET_NEWSLETTERS' = 'SET_NEWSLETTERS'
const SET_ENEWS_BLASTS: 'SET_ENEWS_BLASTS' = 'SET_ENEWS_BLASTS'
const SET_ENEWS_DIALOG_OPEN: 'SET_ENEWS_DIALOG_OPEN' = 'SET_ENEWS_DIALOG_OPEN'

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

export const setNewsletterYear = (year: State['newsletterYear']) => {
  return {
    type: SET_NEWSLETTER_YEAR,
    year
  }
}

export const setNewsletters = (newsletters: State['newsletters']) => {
  return {
    type: SET_NEWSLETTERS,
    newsletters
  }
}

export const setEnewsBlasts = (enewsBlasts: State['enewsBlasts']) => {
  return {
    type: SET_ENEWS_BLASTS,
    enewsBlasts
  }
}

export const setEnewsDialogOpen = (open: State['enewsDialogOpen']) => {
  return {
    type: SET_ENEWS_DIALOG_OPEN,
    open
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
        newsReleases: [...action.newsReleases]
      }
    case SET_NEWSLETTER_YEAR:
      return {
        ...state,
        newsletterYear: action.year
      }
    case SET_NEWSLETTERS:
      return {
        ...state,
        newsletters: [...action.newsletters]
      }
    case SET_ENEWS_BLASTS:
      return {
        ...state,
        enewsBlasts: [...action.enewsBlasts]
      }
    case SET_ENEWS_DIALOG_OPEN:
      return {
        ...state,
        enewsDialogOpen: action.open
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
