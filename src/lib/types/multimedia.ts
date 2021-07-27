import {CosmicMediaMeta} from '@lib/services/cosmicService'
import {stringify} from 'querystringify'

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
  | 'id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

export type PickedVideoResponse = Pick<
  CosmicMediaMeta<VideoLibraryMetadata>,
  | 'id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

export type PickedPublicationResponse = Pick<
  CosmicMediaMeta<PublicationLibraryMetadata>,
  | 'id'
  | 'original_name'
  | 'url'
  | 'imgix_url'
  | 'metadata'
  | 'name'
  | 'derivedFilenameAttr'
>

interface MappedProperties {
  width?: number // For <Image/>, not for videos.
  height?: number // For <Image/>, not for videos.
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

const cosmicGetMediaProps = {
  props: 'id,original_name,url,imgix_url,metadata,name'
}
const multimediaQs = stringify(
  {...cosmicGetMediaProps, folder: 'multimedia-library'},
  true
)
const publicationsQs = stringify(
  {...cosmicGetMediaProps, folder: 'publication-library'},
  true
)

export const multimediaUrl = `/api/cosmic/media${multimediaQs}`
export const publicationsUrl = `/api/cosmic/media${publicationsQs}`
