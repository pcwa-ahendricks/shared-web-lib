// cspell:ignore addtl watersenseApproved
import fetch from 'isomorphic-unfetch'
import {IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'
import {IrrigUpgradeLocationOpts} from '@components/formFields/IrrigUpgradeLocationCheckboxes'
import {BooleanAsString} from '@lib/safeCastBoolean'

const MAILJET_URL = process.env.NEXT_MAILJET_URL || ''

type ErrorResponse = Error & {response?: Response}

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
  signature: string
  captcha: string
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
  // noOfToilets: number
  treatedCustomer: '' | 'Yes' | 'No'
  builtPriorCutoff: '' | 'Yes' | 'No'
  manufacturerModel: {
    manufacturer: string
    model: string
  }[]
  watersenseApproved: string
  termsAgree: BooleanAsString
  signature: string
  captcha: string
  receipts: string[]
  installPhotos: string[]
}

export interface ToiletRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: ToiletRebateFormData
}

type RequestBody =
  | IrrigationControllerRequestBody
  | IrrigationEfficienciesRequestBody
  | LawnReplacementRequestBody
  | ContactUsRequestBody
  | WashingMachineRequestBody
  | ToiletRequestBody

async function postRebateForm(serviceUriPath: string, body: RequestBody) {
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

export {postRebateForm}
