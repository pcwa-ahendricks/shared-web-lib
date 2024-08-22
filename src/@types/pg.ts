// note, there is no reason to extend QueryResultRow since that interface is just a placeholder

import {type Descendant} from 'slate'

export interface NewsReleaseResultRow {
  readonly id: number
  s3_key: string
  title: string
  published_at: Date
  hidden: boolean
  readonly modified_at: Date
  readonly created_at: Date
}

export interface NewsletterResultRow {
  readonly id: number
  s3_key: string
  title: string
  published_at: Date
  hidden: boolean
  readonly modified_at: Date
  readonly created_at: Date
}

export interface NewsBlurbResultRow {
  readonly id: number
  title: Descendant[]
  body: Descendant[]
  published_at: Date
  visible: boolean
  env_production: boolean
  env_preview: boolean
  env_development: boolean
  link_url: string
  cta_caption: string
  readonly modified_at: Date
  readonly created_at: Date
}
