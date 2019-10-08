export interface CosmicGetMediaResponse {
  media: GetMedia[]
}

export interface CosmicAddMediaResponse {
  media: AddMedia
}

export interface GetMedia {
  _id: string
  name: string
  original_name: string
  size: number
  type: string
  bucket: string
  created: string
  location: string
  url: string
  imgix_url: string
  folder: string
  metadata?: Metadata
}

export interface AddMedia {
  name: string
  original_name: string
  size: number
  type: string
  bucket: string
  created: string
  location: string
  url: string
  imgix_url: string
  folder: string
  metadata: Metadata
}

interface Metadata {
  caption: string
  credit: string
}
