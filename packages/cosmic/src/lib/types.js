// @flow
export type CosmicResponse {
  media: Media[];
}

type Media {
  _id: string;
  name: string;
  original_name: string;
  size: number;
  type: string;
  bucket: string;
  created: string;
  location: string;
  url: string;
  imgix_url: string;
  folder: string;
  metadata?: Metadata;
}

type Metadata {
  caption: string;
  credit: string;
}