// cspell:ignore lightbox
import React, {createContext, useReducer} from 'react'
import {CosmicMediaMeta} from '@lib/services/cosmicService'

interface State {
  selectedGallery: null | string
  multimediaList: PhotoList | VideoList | PublicationList
  lightboxIndex: number
  lightboxViewerOpen: boolean
  lvDownloadMenuOpen: boolean
}

type ProviderProps = {
  children: React.ReactNode
}

export type PublicationLibraryMetadata = {
  title: string
  category: string
}

export type PhotoLibraryMetadata = {
  category?: string
  gallery?: string
  orientation?: string
  caption?: string
  'gallery-cover'?: string // Boolean as string
  description?: string // Used with "alt" attribute
  'video-poster'?: string //  Boolean as string used with Array.filter
}

export type VideoLibraryMetadata = {
  category?: string
  gallery?: string
  'video-poster'?: string // Boolean as string used with Array.filter
  'poster-filename'?: string // Cosmic filename
  'gallery-cover'?: string // Boolean as string
  caption?: string
}

export type PickedPhotoResponse = Pick<
  CosmicMediaMeta<PhotoLibraryMetadata>,
  | '_id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

export type PickedVideoResponse = Pick<
  CosmicMediaMeta<VideoLibraryMetadata>,
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
  width?: number // For <ImgixFancy/>, not for videos.
  height?: number // For <ImgixFancy/>, not for videos.
  paddingPercent?: string // For <ImgixFancy/>, not for videos.
}
interface MappedLightboxProperties extends MappedProperties {
  index: number
  source: string // For react-images
  caption?: string
}
export type MappedLightbox = PickedPhotoResponse & MappedLightboxProperties
export type PhotoList = Array<PickedPhotoResponse>
export type MappedPhoto = PickedPhotoResponse & MappedProperties
export type MappedPhotoList = Array<MappedPhoto>
export type MappedLightboxList = Array<MappedLightbox>

export type PublicationList = Array<PickedPublicationResponse>

export type VideoList = Array<PickedVideoResponse>

// State
const initialState: State = {
  selectedGallery: null,
  multimediaList: [],
  lightboxIndex: 0,
  lightboxViewerOpen: false,
  lvDownloadMenuOpen: false
}

// Typescript is crazy and wants a default value passed, hence initialState and empty dispatch function.
export const MultimediaContext = createContext<{
  state: State
  dispatch: React.Dispatch<any>
  // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({state: initialState, dispatch: () => {}})

// Action Types
const Type = {
  SET_SELECTED_GALLERY: 'SET_SELECTED_GALLERY',
  SET_MULTIMEDIA_LIST: 'SET_MULTIMEDIA_LIST',
  SET_LIGHTBOX_INDEX: 'SET_LIGHTBOX_INDEX',
  SET_LIGHTBOX_VIEWER_OPEN: 'SET_LIGHTBOX_VIEWER_OPEN',
  SET_LV_DOWNLOAD_MENU_OPEN: 'SET_LV_DOWNLOAD_MENU_OPEN'
} as const

// Actions
export const setSelectedGallery = (gallery: State['selectedGallery']) => {
  return {
    type: Type.SET_SELECTED_GALLERY,
    gallery
  }
}

export const setMultimediaList = (multimedia: State['multimediaList']) => {
  return {
    type: Type.SET_MULTIMEDIA_LIST,
    multimedia
  }
}

export const setLightboxIndex = (index?: State['lightboxIndex'] | null) => {
  return {
    type: Type.SET_LIGHTBOX_INDEX,
    index
  }
}

export const setLightboxViewerOpen = (open?: State['lightboxViewerOpen']) => {
  return {
    type: Type.SET_LIGHTBOX_VIEWER_OPEN,
    open
  }
}

export const setLvDownloadMenuOpen = (open?: State['lvDownloadMenuOpen']) => {
  return {
    type: Type.SET_LV_DOWNLOAD_MENU_OPEN,
    open
  }
}

// Reducer
const multimediaReducer = (state: State, action: any): State => {
  switch (action.type) {
    case Type.SET_SELECTED_GALLERY:
      return {
        ...state,
        selectedGallery: action.gallery
      }
    case Type.SET_MULTIMEDIA_LIST:
      return {
        ...state,
        multimediaList: [...action.multimedia]
      }
    case Type.SET_LIGHTBOX_INDEX:
      return {
        ...state,
        lightboxIndex: action.index ?? 0
      }
    case Type.SET_LIGHTBOX_VIEWER_OPEN:
      return {
        ...state,
        lightboxViewerOpen: action.open
      }
    case Type.SET_LV_DOWNLOAD_MENU_OPEN:
      return {
        ...state,
        lvDownloadMenuOpen: action.open
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
