// cspell:ignore cbarnhill waterefficiency pcwamain customerservices maint
import reCAPTCHA from 'recaptcha2'
import {MailJetMessage} from './mailjet'
import {ObjectSchema} from 'yup'
const isDev = process.env.NODE_ENV === 'development'

export interface AttachmentFieldValue {
  status: string
  url: string
}

const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const emailRecipientsIrrigation: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'PCWA Webmaster', Email: 'webmaster@pcwa.net'},
      // {Name: 'Water Efficiency', Email: 'waterefficiency@pcwa.net'},
      {Name: 'Rebates', Email: 'rebates@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const emailRecipientsAppliance: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'PCWA Webmaster', Email: 'webmaster@pcwa.net'},
      {Name: 'Rebates', Email: 'rebates@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const emailRecipientsCsMaint: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'PCWA Webmaster', Email: 'webmaster@pcwa.net'},
      {Name: 'Customer Services', Email: 'customerservices@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const emailRecipientsCollections: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'PCWA Webmaster', Email: 'webmaster@pcwa.net'},
      // {Name: 'Collections', Email: 'collections@pcwa.net'},
      {Name: 'Rebecca', Email: 'rbutterfield@pcwa.net'}, // just for debugging. delete when in production
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
  validateSchema
}
