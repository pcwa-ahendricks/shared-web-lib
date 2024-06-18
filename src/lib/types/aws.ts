import {type _Object} from '@aws-sdk/client-s3'

export interface AwsObjectExt extends _Object {
  filename: string
  url: string
  cdnUrl: string
  imgixUrl?: string
  pubDate?: string
}