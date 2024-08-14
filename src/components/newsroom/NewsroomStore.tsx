// cspell:ignore mediachimp
import React, {createContext, useReducer} from 'react'
import {
  type NewsletterResultRow,
  type NewsReleaseResultRow
} from 'src/@types/pg'

interface State {
  newsReleaseYear?: number
  // newsReleases: GroupedNewsReleases
  newsletterYear?: number
  // newsletters: GroupedNewsletters
  // enewsBlasts: EnewsBlast[]
  enewsDialogOpen: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

export interface EnewsBlast {
  id: string
  title: string
  mailchimpURL: string
  distributionDate: Date
}

export type GroupedNewsletterVal = Omit<
  NewsletterResultRow,
  'modified_at' | 'created_at' | 'hidden'
> & {
  pubYear: number
  nextLinkAs: string
  imgixUrl: string
}
export type GroupedNewsletters = Array<{
  year: number
  values: GroupedNewsletterVal[]
}>

export type GroupedNewsReleaseVal = Omit<
  NewsReleaseResultRow,
  'modified_at' | 'created_at' | 'hidden'
> & {
  pubYear: number
  nextLinkAs: string
  imgixUrl: string
}
export type GroupedNewsReleases = Array<{
  year: number
  values: GroupedNewsReleaseVal[]
}>

// State
const initialState: State = {
  // newsReleases: [],
  // newsletters: [],
  // enewsBlasts: [],
  enewsDialogOpen: false
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const NewsroomContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_NEWS_RELEASE_YEAR: 'SET_NEWS_RELEASE_YEAR',
  // SET_NEWS_RELEASES: 'SET_NEWS_RELEASES' ,
  SET_NEWSLETTER_YEAR: 'SET_NEWSLETTER_YEAR',
  // SET_NEWSLETTERS: 'SET_NEWSLETTERS' ,
  // SET_ENEWS_BLASTS: 'SET_ENEWS_BLASTS' ,
  SET_ENEWS_DIALOG_OPEN: 'SET_ENEWS_DIALOG_OPEN'
} as const

// Actions
export const setNewsReleaseYear = (year: State['newsReleaseYear']) => {
  return {
    type: Type.SET_NEWS_RELEASE_YEAR,
    year
  }
}

// export const setNewsReleases = (newsReleases: State['newsReleases']) => {
//   return {
//     type: SET_NEWS_RELEASES,
//     newsReleases
//   }
// }

export const setNewsletterYear = (year: State['newsletterYear']) => {
  return {
    type: Type.SET_NEWSLETTER_YEAR,
    year
  }
}

// export const setNewsletters = (newsletters: State['newsletters']) => {
//   return {
//     type: Type.SET_NEWSLETTERS,
//     newsletters
//   }
// }

// export const setEnewsBlasts = (enewsBlasts: State['enewsBlasts']) => {
//   return {
//     type: Type.SET_ENEWS_BLASTS,
//     enewsBlasts
//   }
// }

export const setEnewsDialogOpen = (open: State['enewsDialogOpen']) => {
  return {
    type: Type.SET_ENEWS_DIALOG_OPEN,
    open
  }
}

// Reducer
const newsroomReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_NEWS_RELEASE_YEAR:
      return {
        ...state,
        newsReleaseYear: action.year
      }
    // case Type.SET_NEWS_RELEASES:
    //   return {
    //     ...state,
    //     newsReleases: [...action.newsReleases]
    //   }
    case Type.SET_NEWSLETTER_YEAR:
      return {
        ...state,
        newsletterYear: action.year
      }
    // case Type.SET_NEWSLETTERS:
    //   return {
    //     ...state,
    //     newsletters: [...action.newsletters]
    //   }
    // case Type.SET_ENEWS_BLASTS:
    //   return {
    //     ...state,
    //     enewsBlasts: [...action.enewsBlasts]
    //   }
    case Type.SET_ENEWS_DIALOG_OPEN:
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
