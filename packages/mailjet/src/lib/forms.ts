// cspell:ignore cbarnhill waterefficiency pcwamain customerservices maint
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import reCAPTCHA from 'recaptcha2'
import {MailJetMessage} from '../lib/types'
import {createError} from 'micro'
import HttpStat from 'http-status-codes'
import {ObjectSchema, Shape} from 'yup'

export interface AttachmentFieldValue {
  status: string
  url: string
}

const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const emailRecipientsIrrigation: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Water Efficiency', Email: 'waterefficiency@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const emailRecipientsAppliance: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Water Efficiency', Email: 'rebates@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const emailRecipientsCsMaint: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Customer Services', Email: 'customerservices@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

const getRecaptcha = () =>
  new reCAPTCHA({
    siteKey: RECAPTCHA_SITE_KEY,
    secretKey: RECAPTCHA_SECRET_KEY
  })

async function validateSchema(
  bodySchema: ObjectSchema<Shape<object, any>>,
  body: any
) {
  const validateOptions = {
    abortEarly: isDev ? false : true
  }

  try {
    await bodySchema.validate(body, validateOptions)
  } catch (error) {
    const {errors = []} = error || {}
    if (isDev) {
      throw createError(400, errors.join(', '))
    } else {
      throw createError(400, HttpStat.getStatusText(400))
    }
  }
}

export {
  getRecaptcha,
  emailRecipientsIrrigation,
  emailRecipientsAppliance,
  emailRecipientsCsMaint,
  validateSchema
}
