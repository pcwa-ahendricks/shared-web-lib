import type {ListBlobResultBlob} from '@vercel/blob'

export interface BlobObjectExt extends ListBlobResultBlob {
  filename: string
  basePath: string
  pubDatePrfx?: Date
}
