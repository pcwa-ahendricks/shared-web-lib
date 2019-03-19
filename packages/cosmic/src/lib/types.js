// @flow
export type CosmicGetMediaResponse = {
  media: GetMedia[]
}

export type CosmicAddMediaResponse = {
  media: AddMedia
}

export type GetMedia = {
  _id: string,
  name: string,
  original_name: string,
  size: number,
  type: string,
  bucket: string,
  created: string,
  location: string,
  url: string,
  imgix_url: string,
  folder: string,
  metadata?: Metadata
}

export type AddMedia = {
  name: string,
  original_name: string,
  size: number,
  type: string,
  bucket: string,
  created: string,
  location: string,
  url: string,
  imgix_url: string,
  folder: string,
  metadata: Metadata
}

type Metadata = {
  caption: string,
  credit: string
}
