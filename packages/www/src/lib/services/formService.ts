// cspell:ignore addtl watersenseApproved
import {IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'
import {IrrigUpgradeLocationOpts} from '@components/formFields/IrrigUpgradeLocationCheckboxes'
import {BooleanAsString} from '@lib/safeCastBoolean'
import fetchOk from '@lib/fetch-ok'

const LAMBDA_URL = process.env.NODE_LAMBDA_URL || ''

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

export interface ContactUsFormData {
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
  formData: ContactUsFormData
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
  const url = `${LAMBDA_URL}/api/mail/${serviceUriPath}`
  try {
    return await fetchOk(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

export {postForm}
