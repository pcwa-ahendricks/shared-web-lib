// cspell:ignore addtl watersenseApproved
import {IrrigSysUpgradeOpts} from '@components/formFields/IrrigSysUpgradeOptsCheckboxes'
import {IrrigUpgradeLocationOpts} from '@components/formFields/IrrigUpgradeLocationCheckboxes'
import {BooleanAsString} from '@lib/safeCastBoolean'
import fetcher from '@lib/fetcher'

export interface WaterLeakFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  leakBeginDate: Date | null
  leakIdentifyDate: Date | null
  leakRepairDate: Date | null
  describe: string
  receipts: string[]
  leakPhotos: string[]
  repairPhotos: string[]
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  signature: string
  captcha: string
}

export interface WaterLeakRequestBody {
  formData: WaterLeakFormData
}
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
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  describe: string
  irrigMethod: string
  upgradeLocations: IrrigUpgradeLocationOpts
  preConvPhotos: string[]
  upgradeOpts: IrrigSysUpgradeOpts
}

export interface IrrigationEfficienciesRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: IrrigationEfficienciesRebateFormData
}

export interface PostConvLawnReplacementFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  rebateCustomer: '' | 'Yes' | 'No'
  projectCompleted: '' | 'Yes' | 'No'
  worksheetCompleted: '' | 'Yes' | 'No'
  photosTaken: '' | 'Yes' | 'No'
  artTurfInstalled: '' | 'Yes' | 'No'
  partsReceipts: '' | 'Yes' | 'No'
  approxSqFeet: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  postConvPhotos: string[]
  worksheetUploads: string[]
  checklistUploads: string[]
  itemizedReceipts: string[]
}

export interface PostConvLawnReplacementRequestBody {
  // recipients: Array<{Name: string, Email: string}>,
  formData: PostConvLawnReplacementFormData
}

export interface PostConvIrrigEffFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  propertyType: string
  rebateCustomer: '' | 'Yes' | 'No'
  projectCompleted: '' | 'Yes' | 'No'
  photosTaken: '' | 'Yes' | 'No'
  partsReceipts: '' | 'Yes' | 'No'
  describe: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  postConvPhotos: string[]
  itemizedReceipts: string[]
}

export interface PostConvIrrigEffRequestBody {
  // recipients: Array<{Name: string, Email: string}>,
  formData: PostConvIrrigEffFormData
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
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  approxSqFeet: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  inspectAgree: BooleanAsString
  signature: string
  captcha: string
  describe: string
  irrigMethod: string
  useArtTurf: BooleanAsString
  alreadyStarted: BooleanAsString
  upgradeLocations: IrrigUpgradeLocationOpts
  preConvPhotos: string[]
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
  serviceAddress: string
  serviceCity: string
  phone: string
  captcha: string
}

export interface ContactUsRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: ContactUsFormData
}

export interface WaterWasteFormData {
  name: string
  email: string
  phone: string
  incidentDateTime: Date | null
  incidentAddress: string
  incidentCity: string
  incidentReason: string
  description: string
  captcha: string
  photos: string[]
}

export interface WaterWasteRequestBody {
  formData: WaterWasteFormData
}
export interface PoolCoverRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  sizeSqFt: string
  manufacturer: string
  model: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  signature: string
  captcha: string
  comments: string
  receipts: string[]
  installPhotos: string[]
}

export interface PoolCoverRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: PoolCoverRebateFormData
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
  howDidYouHear: string
  otherHowDidYouHear: string
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
  howDidYouHear: string
  otherHowDidYouHear: string
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
export interface SmartControllerRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  treatedCustomer: '' | 'Yes' | 'No'
  make: string
  model: string
  replaceExisting: BooleanAsString
  watersenseApproved: string
  termsAgree: BooleanAsString
  emailAttachments: BooleanAsString
  signature: string
  captcha: string
  comments: string
  receipts: string[]
  installPhotos: string[]
}

export interface SmartControllerRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: SmartControllerRebateFormData
}
export interface UntreatedWaterTankRebateFormData {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity: string
  phone: string
  howDidYouHear: string
  otherHowDidYouHear: string
  propertyType: string
  untreatedCustomer: '' | 'Yes' | 'No'
  termsAgree: BooleanAsString
  signature: string
  captcha: string
  comments: string
}

export interface UntreatedWaterTankRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: UntreatedWaterTankRebateFormData
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

export interface Sb998SelfCertFormData {
  treatedCustomer: '' | 'Yes' | 'No'
  householdAssist: '' | 'Yes' | 'No'
  householdIncome: '' | 'Yes' | 'No'
  primaryCareCert: '' | 'Yes' | 'No'
  paymentPlan: '' | 'Yes' | 'No'
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  svcAddress: string
  ownerTenant: string
  phone: string
  // termsAgree: BooleanAsString
  signature: string
  captcha: string
  // not used w/ formik (or yup) form, only used w/ Mailjet
  applicationTitle: string
}

export interface Sb998SelfCertRequestBody {
  // recipients: {Name: string, Email: string}[],
  formData: Sb998SelfCertFormData
}

export interface CwmpContactUsFormData {
  name: string
  email: string
  message: string
}
export interface CwmpContactUsRequestBody {
  formData: CwmpContactUsFormData
}

type RequestBody =
  | IrrigationControllerRequestBody
  | IrrigationEfficienciesRequestBody
  | LawnReplacementRequestBody
  | ContactUsRequestBody
  | PoolCoverRequestBody
  | WashingMachineRequestBody
  | ToiletRequestBody
  | SmartControllerRequestBody
  | UntreatedWaterTankRequestBody
  | ContactInfoRequestBody
  | WaterWasteRequestBody
  | Sb998SelfCertRequestBody
  | CwmpContactUsRequestBody
  | PostConvLawnReplacementRequestBody
  | PostConvIrrigEffRequestBody
  | WaterLeakRequestBody

async function postForm(serviceUriPath: string, body: RequestBody) {
  const url = `/api/mail/${serviceUriPath}`
  try {
    return await fetcher(url, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  } catch (error) {
    console.warn('An unexpected error occurred.', error)
    throw error
  }
}

export {postForm}
