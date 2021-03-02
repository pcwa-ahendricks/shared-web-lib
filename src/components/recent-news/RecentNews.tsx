// cspell:ignore mediachimp

export interface NewsBlurbMetadata {
  linkURL?: string
  releaseDate: string
  title: string
  summary: string
  hide: boolean
  readMoreCaption: string
}

export interface NewsBlurb {
  id: string // Cosmic id
  linkURL?: string
  releaseDate: Date // Will parse Cosmic string as Date object
  title: string
  summary: string
  hide: boolean
  readMoreCaption: string
}

export type RecentNews = NewsBlurb[]
