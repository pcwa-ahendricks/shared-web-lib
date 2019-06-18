// cspell:ignore cbarnhill
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import reCAPTCHA from 'recaptcha2'
import fetch from 'isomorphic-unfetch'
import {MailJetSendRequest, MailJetMessage} from '../lib/types'
import {createError} from 'micro'
import HttpStat from 'http-status-codes'
import {ObjectSchema, Shape} from 'yup'

export interface AttachmentFieldValue {
  status: string
  url: string
}

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''

const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const emailRecipients: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Cassandra', Email: 'cbarnhill@pcwa.net'}
    ]

const getBasicAuth = () =>
  Buffer.from(`${MAILJET_KEY}:${MAILJET_SECRET}`).toString('base64')

const getRecaptcha = () =>
  new reCAPTCHA({
    siteKey: RECAPTCHA_SITE_KEY,
    secretKey: RECAPTCHA_SECRET_KEY
  })

async function postMailJetRequest(requestBody: MailJetSendRequest) {
  const basicAuth = getBasicAuth()
  const response = await fetch('https://api.mailjet.com/v3.1/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${basicAuth}`
    },
    body: JSON.stringify(requestBody)
  })

  if (!response.ok) {
    // console.log('Bad response: ', response)
    try {
      const text = await response.text()
      console.log('Message Text: ', text)
    } catch (error) {
      throw error
    }
    if (response.status) {
      throw createError(response.status, response.statusText)
    } else {
      throw createError(500, 'Mailjet send request failed.')
    }
  }
  const data = await response.json()

  return data
}

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

export {getRecaptcha, postMailJetRequest, emailRecipients, validateSchema}
