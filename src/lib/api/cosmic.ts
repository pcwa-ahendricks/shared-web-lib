// https://www.cosmicjs.com/docs/api/objects#get-objects
export const getObjectMethodDefaults = {
  status: 'published',
  limit: 1000,
  skip: 0,
  useCache: true,
  pretty: false,
  depth: 0,
  sort: 'order',
  props: [] as string[]
} as const

export interface CosmicGetMediaResponse {
  media: GetMedia[]
}

export interface CosmicAddMediaResponse {
  media: AddMedia
}

export interface GetMedia {
  id: string
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
