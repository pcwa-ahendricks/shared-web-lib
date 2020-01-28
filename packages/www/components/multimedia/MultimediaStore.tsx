import React, {createContext, useReducer} from 'react'
import {CosmicMediaMeta} from '@lib/services/cosmicService'

interface State {
  selectedGallery: null | string
  multimediaList: MultimediaList
}

type ProviderProps = {
  children: React.ReactNode
}

type PickedMediaResponse = Pick<
  CosmicMediaMeta,
  '_id' | 'original_name' | 'imgix_url' | 'metadata' | 'name'
>

export type MultimediaList = Array<PickedMediaResponse>

// State
const initialState: State = {
  selectedGallery: null,
  multimediaList: []
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const MultimediaContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const SET_SELECTED_GALLERY: 'SET_SELECTED_GALLERY' = 'SET_SELECTED_GALLERY'
const SET_MULTIMEDIA_LIST: 'SET_MULTIMEDIA_LIST' = 'SET_MULTIMEDIA_LIST'

// Actions
export const setSelectedGallery = (gallery: State['selectedGallery']) => {
  return {
    type: SET_SELECTED_GALLERY,
    gallery
  }
}

export const setMultimediaList = (multimedia: State['multimediaList']) => {
  return {
    type: SET_MULTIMEDIA_LIST,
    multimedia
  }
}

// Reducer
const multimediaReducer = (state: State, action: any): State => {
  switch (action.type) {
    case SET_SELECTED_GALLERY:
      return {
        ...state,
        selectedGallery: action.gallery
      }
    case SET_MULTIMEDIA_LIST:
      return {
        ...state,
        multimediaList: [...action.multimedia]
      }
    default:
      return state
  }
}

// Provider
const MultimediaProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(multimediaReducer, initialState)
  const value = {state, dispatch}
  return (
    <MultimediaContext.Provider value={value}>
      {children}
    </MultimediaContext.Provider>
  )
}

export default MultimediaProvider
