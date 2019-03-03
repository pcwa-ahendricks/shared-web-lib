// @flow

import fetch from 'isomorphic-unfetch'

const UPLOADS_URL = process.env.NEXT_UPLOADS_URL || ''
export const UPLOAD_SERVICE_BASE_URL = `${UPLOADS_URL}/uploads`

const uploadFile = async (file: any, subFolder: string = '') => {
  const formData = new FormData()
  formData.append(subFolder, file, file.name)
  try {
    // Don't set headers manually. See https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post for more info.
    const response = await fetch(UPLOAD_SERVICE_BASE_URL, {
      method: 'POST',
      body: formData
    })
    if (response.ok) {
      const data: UploadResponse = await response.json()
      return data
    } else {
      return errorHandler(response, file, subFolder)
    }
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    return errorHandler(null, file, subFolder)
  }
}

const errorHandler = async (res, file, subFolder, err) => {
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
  const data = {
    fieldName: subFolder,
    fileName: file.name,
    filePath: '',
    status: 'failed',
    reason: reason
  }
  return data
}

type UploadResponse = {
  status: string,
  fileName: string,
  fieldName: string,
  filePath: string
}

export {uploadFile}
