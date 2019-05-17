// cspell:ignore addtl
import fetch from 'isomorphic-unfetch'
import {IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'
import {IrrigUpgradeLocationOpts} from '@components/formFields/IrrigUpgradeLocationCheckboxes'

const MAILJET_URL = process.env.NEXT_MAILJET_URL || ''

export interface IrrigationControllerRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  manufacturer: string
  model: string
  additional: string
  purchaseDate: string
  termsAgree: boolean
  signature: string
  captcha: string
  receipts: string[]
  cntrlPhotos: string[]
  addtlSensorPhotos: string[]
}

export interface IrrigationControllerRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: IrrigationControllerRebateFormData
}

export interface IrrigationEfficienciesRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  termsAgree: boolean
  inspectAgree: boolean
  signature: string
  captcha: string
  irrigMethod: string
  upgradeLocations: IrrigUpgradeLocationOpts
  upgradeOpts: IrrigSysUpgradeOpts
}

export interface IrrigationEfficienciesRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: IrrigationEfficienciesRebateFormData
}

export interface LawnReplacementRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  approxSqFeet: string
  termsAgree: boolean
  inspectAgree: boolean
  signature: string
  captcha: string
  irrigMethod: string
  useArtTurf: boolean
  alreadyStarted: boolean
}

export interface LawnReplacementRequestBody {
  // recipients: Array<{Name: string, Email: string}>,
  formData: LawnReplacementRebateFormData
}

export interface ContactUsRebateFormData {
  name: string
  message: string
  email: string
  subject: string
  reason: string
  phone: string
  captcha: string
}

export interface ContactUsRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: ContactUsRebateFormData
}

type RequestBody =
  | IrrigationControllerRequestBody
  | IrrigationEfficienciesRequestBody
  | LawnReplacementRequestBody
  | ContactUsRequestBody

async function postRebateForm(serviceUriPath: string, body: RequestBody) {
  const URL = `${MAILJET_URL}/${serviceUriPath}`
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
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

export {postRebateForm}
