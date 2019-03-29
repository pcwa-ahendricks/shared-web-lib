// @flow
import {type UploadResponse} from '@lib/services/uploadService'

// Types were originally in <DropzoneUploader/> but were moved here do to error messages populating console. Possibly due to introduction of forwardRef use in component.
export type UploadedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  serverResponse: UploadResponse,
  originalName?: string,
  ext?: string
}

// Marking ext and previewUrl as maybe null helps with prop type checking in <UploadRejectedDialog/>.
export type DroppedFile = {
  name: string,
  type: string,
  lastModified: number,
  size: number,
  originalName?: string,
  ext: ?string,
  previewUrl: ?string
}
