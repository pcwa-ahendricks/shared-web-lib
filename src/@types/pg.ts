// note, there is no reason to extend QueryResultRow since that interface is just a placeholder

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
