// @flow
// cspell:ignore addtl
import fetch from 'isomorphic-unfetch'
import {type IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'

const MAILJET_URL = process.env.NEXT_MAILJET_URL || ''
const IRRIG_CNTRL_REBATE_BASE_URL = 'irrigation-controller-rebate'
const URL = `${MAILJET_URL}/${IRRIG_CNTRL_REBATE_BASE_URL}`

export type IrrigationControllerRebateFormData = {|
  firstName: string,
  lastName: string,
  email: string,
  accountNo: string,
  address: string,
  city: string,
  otherCity: string,
  phone: string,
  propertyType: string,
  manufacturer: string,
  model: string,
  additional: string,
  purchaseDate: string,
  termsAgree: boolean,
  signature: string,
  captcha: string,
  receipts: Array<string>,
  cntrlPhotos: Array<string>,
  addtlSensorPhotos: Array<string>
|}

export type IrrigationControllerRequestBody = {|
  // recipients: Array<{Name: string, Email: string}>,
  formData: IrrigationControllerRebateFormData
|}

export type IrrigationEfficienciesRebateFormData = {|
  firstName: string,
  lastName: string,
  email: string,
  accountNo: string,
  address: string,
  city: string,
  otherCity: string,
  phone: string,
  propertyType: string,
  manufacturer: string,
  model: string,
  purchaseDate: string,
  termsAgree: boolean,
  signature: string,
  captcha: string,
  upgradeOpts: IrrigSysUpgradeOpts
|}

export type IrrigationEfficienciesRequestBody = {|
  // recipients: Array<{Name: string, Email: string}>,
  formData: IrrigationEfficienciesRebateFormData
|}

type RequestBody =
  | IrrigationControllerRequestBody
  | IrrigationEfficienciesRequestBody

async function postRebateForm(body: RequestBody) {
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

export {postRebateForm}
