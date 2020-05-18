// cspell:ignore lightbox
import React, {createContext, useReducer} from 'react'
import {CosmicMediaMeta} from '@lib/services/cosmicService'

interface State {
  selectedGallery: null | string
  multimediaList: MultimediaList
  lightboxIndex: number
  lightboxViewerOpen: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

export type PublicationLibraryMetadata = {
  title: string
  category: string
}

export type PickedMultimediaResponse = Pick<
  CosmicMediaMeta,
  | '_id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

export type PickedPublicationResponse = Pick<
  CosmicMediaMeta<PublicationLibraryMetadata>,
  | '_id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

interface MappedProperties {
  source?: string // For react-images, not for videos.
  width?: number // For <ImgixFancy/>, not for videos.
  height?: number // For <ImgixFancy/>, not for videos.
  paddingPercent?: string // For <ImgixFancy/>, not for videos.
}
export type MultimediaList = Array<PickedMultimediaResponse>
export type PublicationList = Array<PickedPublicationResponse>
export type MappedMultimedia = PickedMultimediaResponse & MappedProperties
export type MappedMultimediaList = Array<MappedMultimedia>

// State
const initialState: State = {
  selectedGallery: null,
  multimediaList: [],
  lightboxIndex: 0,
  lightboxViewerOpen: false
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
const SET_LIGHTBOX_INDEX: 'SET_LIGHTBOX_INDEX' = 'SET_LIGHTBOX_INDEX'
const SET_LIGHTBOX_VIEWER_OPEN: 'SET_LIGHTBOX_VIEWER_OPEN' =
  'SET_LIGHTBOX_VIEWER_OPEN'

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

export const setLightboxIndex = (index?: State['lightboxIndex'] | null) => {
  return {
    type: SET_LIGHTBOX_INDEX,
    index
  }
}

export const setLightboxViewerOpen = (open?: State['lightboxViewerOpen']) => {
  return {
    type: SET_LIGHTBOX_VIEWER_OPEN,
    open
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
    case SET_LIGHTBOX_INDEX:
      return {
        ...state,
        lightboxIndex: action.index ?? 0
      }
    case SET_LIGHTBOX_VIEWER_OPEN:
      return {
        ...state,
        lightboxViewerOpen: action.open
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
