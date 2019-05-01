import fetch from 'isomorphic-unfetch'

const COSMIC_URL = process.env.NEXT_COSMIC_URL || ''
const UPLOAD_SERVICE_BASE_URL = `${COSMIC_URL}/uploads`

const errorHandler = async (
  res: Response | null,
  file: File,
  subFolder: string,
  err?: any
) => {
  // Instead of throwing the error we want to set data response accordingly so progress/status indicators know what to do.
  // const error = new Error(text || response.statusText)
  // error.response = response
  // throw error
  let reason
  if (res) {
    try {
      const text = await res.text()
      reason = text || res.statusText
    } catch (error) {
      reason = 'An Error Occurred.'
    }
  } else if (err && err.message) {
    reason = err.message
  } else {
    reason = 'An Error Occurred.'
  }
  const data: UploadResponse = {
    media: null,
    fieldName: subFolder,
    fileName: file.name,
    status: 'failed',
    reason: reason
  }
  return data
}

const uploadFile = async (
  file: File,
  subFolder: string = ''
): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append(subFolder, file, file.name)
  try {
    // Don't set headers manually. See https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post for more info.
    const response = await fetch(UPLOAD_SERVICE_BASE_URL, {
      method: 'POST',
      body: formData
    })
    if (response.ok) {
      const data: CosmicAddMediaResponse = await response.json()
      return {
        ...data,
        status: 'success',
        fieldName: subFolder,
        fileName: file.name,
        reason: ''
      }
    } else {
      return errorHandler(response, file, subFolder)
    }
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    return errorHandler(null, file, subFolder)
  }
}

// export type UploadResponse = {
//   status: UploadStatus,
//   fileName: string,
//   fieldName: string,
//   filePath: string
// }

// @flow
// type CosmicGetMediaResponse = {
//   media: GetMedia[]
// }

type CosmicAddMediaResponse = {
  media: AddMedia
}

// type GetMedia = {
//   _id: string,
//   name: string,
//   original_name: string,
//   size: number,
//   type: string,
//   bucket: string,
//   created: string,
//   location: string,
//   url: string,
//   imgix_url: string,
//   folder: string,
//   metadata?: Metadata
// }

interface AddMedia {
  name: string
  original_name: string
  size: number
  type: string
  bucket: string
  created: string
  location: string
  url: string
  imgix_url: string
  folder: string
  metadata: Metadata
}

interface Metadata {
  caption: string
  credit: string
}

export type UploadStatus = 'unknown' | 'success' | 'failed'

export interface UploadResponse {
  fieldName: string
  fileName: string
  status: UploadStatus
  media: AddMedia | null
  reason: string | null
}

export {uploadFile}
