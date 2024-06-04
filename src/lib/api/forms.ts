// cspell:ignore cbarnhill waterefficiency pcwamain customerservices maint
import reCAPTCHA from 'recaptcha2'
import {MailJetMessage} from './mailjet'
import {ObjectSchema} from 'yup'
const isDev = process.env.NODE_ENV === 'development'

export interface AttachmentFieldValue {
  status: string
  url: string
}

const DEV_EMAIL = 'testweb1@pcwa.net'

const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const emailRecipientsIrrigation: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : // {Name: 'Water Efficiency', Email: 'waterefficiency@pcwa.net'},
      {Name: 'Rebates', Email: 'rebates@pcwa.net'}
]

const emailRecipientsAppliance: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : {Name: 'Rebates', Email: 'rebates@pcwa.net'}
]

const emailRecipientsEffRebates: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : {Name: 'Rebates', Email: 'rebates@pcwa.net'}
]

const emailRecipientsCsMaint: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : {Name: 'Customer Services', Email: 'customerservices@pcwa.net'}
]

const emailRecipientsCollections: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : {Name: 'Collections', Email: 'collections@pcwa.net'}
  // {Name: 'Rebecca', Email: 'rbutterfield@pcwa.net'}, // just for debugging. delete when in production
]

const emailRecipientsWtrWaste: MailJetMessage['To'] = [
  isDev
    ? {Name: 'PCWA Web Test User', Email: DEV_EMAIL}
    : {Email: 'customerservices@pcwa.net', Name: 'Customer Services'}
]

const emailRecipientsContactUs = (subject: string) =>
  isDev
    ? [{Name: 'PCWA Web Test User', Email: DEV_EMAIL}]
    : subject.toLowerCase() === 'clerk to the board'
      ? [{Email: 'clerk@pcwa.net', Name: 'Clerk'}]
      : [{Email: 'customerservices@pcwa.net', Name: 'Customer Services'}]

const emailRecipientsSysAdmin: MailJetMessage['Bcc'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'PCWA Webmaster', Email: 'webmaster@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const getRecaptcha = () =>
  new reCAPTCHA({
    siteKey: RECAPTCHA_SITE_KEY,
    secretKey: RECAPTCHA_SECRET_KEY
  })

async function validateSchema(bodySchema: ObjectSchema<any>, body: any) {
  const validateOptions = {
    abortEarly: isDev ? false : true
  }

  try {
    await bodySchema.validate(body, validateOptions)
  } catch (error) {
    const {errors = []} = error || {}
    if (isDev) {
      throw errors.join(', ')
    } else {
      throw 'Invalid Schema'
    }
  }
}

export {
  getRecaptcha,
  emailRecipientsIrrigation,
  emailRecipientsAppliance,
  emailRecipientsCsMaint,
  emailRecipientsCollections,
  emailRecipientsEffRebates,
  emailRecipientsSysAdmin,
  emailRecipientsWtrWaste,
  emailRecipientsContactUs,
  validateSchema
}
