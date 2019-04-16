// @flow
// cspell:ignore addtl cbarnhill truthy
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {string, object, boolean} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import checkReferrer from '@pcwa/micro-check-referrer'
import {format} from 'date-fns'
import reCAPTCHA from 'recaptcha2'
import limiter from '@pcwa/micro-limiter'
import {type IncomingMessage} from 'http'
import {type MailJetSendRequest, type MailJetMessage} from '../lib/types'
import fetch from 'isomorphic-unfetch'
import isNumber from 'is-number'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''
const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const MAILJET_TEMPLATE_ID = 765489

const basicAuth = new Buffer.from(`${MAILJET_KEY}:${MAILJET_SECRET}`).toString(
  'base64'
)

const recaptcha = new reCAPTCHA({
  siteKey: RECAPTCHA_SITE_KEY,
  secretKey: RECAPTCHA_SECRET_KEY
})

const RECIPIENTS: $PropertyType<MailJetMessage, 'To'> = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Cassandra', Email: 'cbarnhill@pcwa.net'}
    ]

type FormDataObj = {|
  firstName: string,
  lastName: string,
  email: string,
  accountNo: string,
  address: string,
  city: string,
  otherCity?: string,
  phone: string,
  propertyType: string,
  irrigMethod: string,
  termsAgree: boolean,
  signature: string,
  captcha: string,
  useArtTurf: boolean,
  alreadyStarted: boolean,
  approxSqFeet: string
|}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        firstName: string().required(),
        lastName: string().required(),
        email: string()
          .email()
          .required(),
        accountNo: string()
          .matches(/^\d+-\d+$/)
          .required(),
        address: string().required(),
        city: string().required(),
        otherCity: string().when('city', (city, schema) =>
          city && city.toLowerCase() === 'other' ? schema.required() : schema
        ),
        phone: string()
          .min(10)
          .required(),
        propertyType: string().required(),
        termsAgree: boolean()
          .required()
          .oneOf([true]),
        inspectAgree: boolean()
          .required()
          .oneOf([true]),
        signature: string().required(),
        captcha: string().required(),
        irrigMethod: string()
          .required()
          .label('Irrigation Method')
          .notOneOf(['Hand water']), // Case sensitive
        useArtTurf: boolean()
          .required()
          .oneOf([false]),
        alreadyStarted: boolean()
          .required()
          .oneOf([false]),
        approxSqFeet: string()
          .required()
          .test(
            'min-sq-feet',
            'A minimum of 300 square feet of lawn must be converted',
            (val): boolean => {
              const stripped = val && val.replace(/[^0-9.]/, '')
              if (isNumber(stripped)) {
                const valAsNo = Math.round(parseFloat(stripped))
                return valAsNo >= 300
              }
              return false
            }
          )
      })
  })

const lawnReplacementRebateHandler = async (req: IncomingMessage) => {
  const body: {
    formData: FormDataObj,
    recipients: Array<{Name: string, Email: string}>
  } = await json(req)

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
      throw createError(400)
    }
  }

  // const sendEmail = Mailjet.post('send', {
  //   version: 'v3.1'
  // })

  const {formData} = body
  const {
    email,
    firstName,
    lastName,
    address,
    otherCity = '',
    phone,
    propertyType,
    irrigMethod,
    useArtTurf,
    approxSqFeet,
    alreadyStarted,
    termsAgree,
    signature,
    captcha
  } = formData
  let {city = '', accountNo} = formData

  // Remove leading zeros from account number.
  accountNo = accountNo
    .split('-')
    .map((part) => part.replace(/^[0]+/g, ''))
    .join('-')

  // Only validate recaptcha key in production.
  if (!isDev) {
    try {
      await recaptcha.validate(captcha)
    } catch (error) {
      const translatedErrors = recaptcha.translateErrors(error) // translate error codes to human readable text
      console.log('Recaptcha key is invalid', translatedErrors)
      throw createError(400, translatedErrors)
    }
  }

  // Overwrite "city" with "otherCity" if another city was specified.
  if (city.toLowerCase() === 'other') {
    city = otherCity
  }

  // "PCWA-No-Spam: webmaster@pcwa.net" is a email Header that is used to bypass Barracuda Spam filter.
  // We add it to all emails so that they don"t get caught.  The header is explicitly added to the
  // Barracuda via a rule Bryan H. added.
  const requestBody: MailJetSendRequest = {
    Messages: [
      {
        From: {
          Email: MAILJET_SENDER,
          Name: 'PCWA Forms'
        },
        To: RECIPIENTS,
        ReplyTo: {
          Email: email,
          Name: `John Doe`
        },
        Headers: {
          'PCWA-No-Spam': 'webmaster@pcwa.net'
        },
        Subject: 'PCWA - Water Efficiency Rebate Submitted',
        TemplateID: MAILJET_TEMPLATE_ID,
        TemplateLanguage: true,
        Variables: {
          firstName,
          lastName,
          accountNo,
          city,
          address,
          email,
          phone,
          propertyType,
          irrigMethod,
          useArtTurf,
          approxSqFeet,
          alreadyStarted,
          submitDate: format(new Date(), 'MMMM do, yyyy'),
          termsAgree,
          signature
        }
      }
    ]
  }

  try {
    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )

    const data = await postMailJetRequest(requestBody)
    return data
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

async function postMailJetRequest(requestBody: MailJetSendRequest) {
  isDev &&
    console.log(`${new Date().toLocaleTimeString()} - Send Request started.`)
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

  isDev &&
    console.log(`${new Date().toLocaleTimeString()} - Send Request completed.`)

  return data
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)
export default applyMiddleware(lawnReplacementRebateHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])
