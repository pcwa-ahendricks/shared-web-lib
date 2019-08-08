// cspell:ignore addtl watersenseApproved
import fetch from 'isomorphic-unfetch'
import {IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'
import {IrrigUpgradeLocationOpts} from '@components/formFields/IrrigUpgradeLocationCheckboxes'
import {BooleanAsString} from '@lib/safeCastBoolean'
import ErrorResponse from '@lib/ErrorResponse'

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
  purchaseDate: Date
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
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
  treatedCustomer: '' | 'Yes' | 'No'
  termsAgree: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  comments: string
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
  treatedCustomer: '' | 'Yes' | 'No'
  approxSqFeet: string
  termsAgree: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  comments: string
  irrigMethod: string
  useArtTurf: BooleanAsString
  alreadyStarted: BooleanAsString
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

export interface WashingMachineRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  existingHigh: '' | 'Yes' | 'No'
  newConstruction: '' | 'Yes' | 'No'
  manufacturer: string
  model: string
  ceeQualify: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  signature: string
  captcha: string
  comments: string
  receipts: string[]
  installPhotos: string[]
}

export interface WashingMachineRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: WashingMachineRebateFormData
}

export interface ToiletRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  noOfToilets: number
  treatedCustomer: '' | 'Yes' | 'No'
  builtPriorCutoff: '' | 'Yes' | 'No'
  manufacturerModel: {
    manufacturer: string
    model: string
  }[]
  watersenseApproved: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  signature: string
  captcha: string
  comments: string
  receipts: string[]
  installPhotos: string[]
}

export interface ToiletRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: ToiletRebateFormData
}

export interface ContactInfoFormData {
  name: string
  spouseName: string
  email: string
  accountNo: string
  address: string
  previousAddress: string
  city: string
  state: string
  zipCode: string
  phone: string
  cellPhone: string
  workPhone: string
  spousePhone: string
  lastFourSS: string
  signature: string
  captcha: string
}

export interface ContactInfoRequestBody {
  formData: ContactInfoFormData
}

type RequestBody =
  | IrrigationControllerRequestBody
  | IrrigationEfficienciesRequestBody
  | LawnReplacementRequestBody
  | ContactUsRequestBody
  | WashingMachineRequestBody
  | ToiletRequestBody
  | ContactInfoRequestBody

async function postForm(serviceUriPath: string, body: RequestBody) {
  const url = `${MAILJET_URL}/${serviceUriPath}`
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
    if (response.ok) {
      const data: any = await response.json()
      return data
    } else {
      const text = await response.text()
      const error: ErrorResponse = new Error(text || response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

export {postForm}
