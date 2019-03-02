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
      const text = await response.text()
      const error = new Error(text || response.statusText)
      // $FlowFixMe
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn(error)
    // return {}
    throw error
  }
}

type UploadResponse = {
  status: string,
  fileName: string,
  fieldName: string,
  filePath: string
}

export {uploadFile}
