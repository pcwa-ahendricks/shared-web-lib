import {type _Object} from '@aws-sdk/client-s3'

export interface AwsObjectExt extends _Object {
  filename: string
  basePath: string
  url: string
  cdnUrl: string
  imgixUrl?: string
  pubDatePrfx?: Date
  metadata?: Record<string, string>
}

export interface AwsNewsRelease extends AwsObjectExt {
  metadata?: {
    hidden?: string // 'true' or 'false'
    'published-at'?: string
    title?: string
  }
}

export interface AwsNewsletter extends AwsObjectExt {
  metadata?: {
    hidden?: string // 'true' or 'false'
    'published-at'?: string
    title?: string
  }
}

export interface AwsMfpfaAgenda extends AwsObjectExt {
  metadata?: {
    hidden?: string // 'true' or 'false'
    'published-at'?: string
    title?: string
  }
}
