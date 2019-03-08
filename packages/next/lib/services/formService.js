// @flow

import fetch from 'isomorphic-unfetch'

const MAILJET_URL = process.env.NEXT_MAILJET_URL || ''
const IRRIG_CNTRL_REBATE_BASE_URL = 'irrigation-controller-rebate'
const URL = `${MAILJET_URL}/${IRRIG_CNTRL_REBATE_BASE_URL}`

export type RebateFormData = {|
  firstName: string,
  lastName: string,
  email: string,
  accountNo: string,
  address: string,
  city: string,
  signature: boolean
|}

export type RequestBody = {|
  attachments: Array<string>,
  // recipients: Array<{Name: string, Email: string}>,
  formData: RebateFormData,
  captcha: string
|}

const postIrrigCntrlRebateForm = async (body: RequestBody) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    if (response.ok) {
      const data: any = await response.json()
      return data
    } else {
      const text = await response.text()
      const error = new Error(text || response.statusText)
      // $FlowFixMe
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

// export type Response = {
// status: UploadStatus,
// fileName: string,
// fieldName: string,
// filePath: string
// }

export {postIrrigCntrlRebateForm}
