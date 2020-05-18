import {UploadResponse} from '@lib/services/uploadService'

export interface UploadedFileAttr {
  name: string
  type: string
  lastModified: number
  size: number
  originalName?: string
  ext: string
  previewUrl: string
  serverResponse: UploadResponse
}

// Marking ext and previewUrl as maybe null helps with prop type checking in <UploadRejectedDialog/>.
export interface DroppedFile extends File {
  name: string
  type: string
  lastModified: number
  size: number
  originalName?: string
  ext: string
  previewUrl: string
}
