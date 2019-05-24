// cspell:ignore addtl cbarnhill
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
// import {attach, splitUpLargeMessage} from '../lib/mailjet-attachments'
import {string, object, array, boolean, Schema, date} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import checkReferrer from '@pcwa/micro-check-referrer'
import {format} from 'date-fns'
import reCAPTCHA from 'recaptcha2'
import limiter from '@pcwa/micro-limiter'
import {IncomingMessage} from 'http'
import {MailJetSendRequest, MailJetMessage} from '../lib/types'
import fetch from 'isomorphic-unfetch'
import HttpStat from 'http-status-codes'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''
const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const MAILJET_TEMPLATE_ID = 755362

const basicAuth = Buffer.from(`${MAILJET_KEY}:${MAILJET_SECRET}`).toString(
  'base64'
)

// const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const recaptcha = new reCAPTCHA({
  siteKey: RECAPTCHA_SITE_KEY,
  secretKey: RECAPTCHA_SECRET_KEY
})

const RECIPIENTS: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'Cassandra', Email: 'cbarnhill@pcwa.net'}
    ]

interface AttachmentFieldValue {
  status: string
  url: string
}

interface FormDataObj {
  firstName: string
  lastName: string
  email: string
  accountNo: string
  address: string
  city: string
  otherCity?: string
  phone: string
  propertyType: string
  manufacturer: string
  model: string
  additional?: string
  purchaseDate: Date
  termsAgree: boolean
  signature: string
  captcha: string
  receipts: AttachmentFieldValue[]
  cntrlPhotos: AttachmentFieldValue[]
  addtlSensorPhotos?: AttachmentFieldValue[]
}

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
        otherCity: string().when(
          'city',
          (city: string | undefined, schema: Schema<string>) =>
            city && city.toLowerCase() === 'other' ? schema.required() : schema
        ),
        phone: string()
          .min(10)
          .required(),
        propertyType: string().required(),
        manufacturer: string().required(),
        model: string().required(),
        additional: string(),
        purchaseDate: date().required(),
        termsAgree: boolean()
          .required()
          .oneOf([true]),
        signature: string().required(),
        captcha: string().required(),
        receipts: array()
          .required()
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string()
                .required()
                .url()
            })
          ),
        cntrlPhotos: array()
          .required()
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string()
                .required()
                .url()
            })
          ),
        addtlSensorPhotos: array()
          .when(
            'additional',
            (additional: string[] | undefined, schema: Schema<string[]>) =>
              additional ? schema.required() : schema
          )
          .of(
            object({
              status: string()
                .required()
                .lowercase()
                .matches(/success/),
              url: string()
                .required()
                .url()
            })
          )
      })
  })

const irrigCntrlRebateHandler = async (req: IncomingMessage) => {
  const data: any = await json(req)
  const body: {
    formData: FormDataObj
    recipients: {Name: string; Email: string}[]
  } = data

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
    manufacturer,
    model,
    additional,
    receipts,
    cntrlPhotos,
    addtlSensorPhotos = [],
    termsAgree,
    signature,
    captcha
  } = formData
  let {city = '', purchaseDate, accountNo} = formData

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

  let purchaseDateStr = ''
  try {
    // purchaseDate = new Date(purchaseDate)
    purchaseDateStr = format(purchaseDate, 'MM/dd/yyyy')
  } catch (error) {
    throw createError(400, 'Invalid Date')
  }

  const receiptImages = receipts.map((attachment) => attachment.url)
  const cntrlImages = cntrlPhotos.map((attachment) => attachment.url)
  const addtlSensorImages = addtlSensorPhotos.map(
    (attachment) => attachment.url
  )

  const replyToName = `${firstName} ${lastName}`

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
          Name: replyToName
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
          purchaseDateStr,
          manufacturer,
          model,
          additional,
          submitDate: format(new Date(), 'MMMM do, yyyy'),
          receiptImages,
          cntrlImages,
          addtlSensorImages,
          termsAgree,
          signature,
          // Mailjet Template language errors will occur and the message will be "blocked" if template attempts to conditionally show section using boolean. Comparing strings works so boolean values are cast to string.
          hasAddtlSensorImages:
            addtlSensorImages && addtlSensorImages.length > 0 ? 'true' : 'false'
        }
      }
    ]
  }

  // We are not actually attaching the attachments, but rather displaying the images inline in the email using the provided URI strings.
  // try {
  //   if (attachments && attachments.length > 0) {
  //     const sendAttachments = await attach(attachments)
  //     requestBody.Messages[0].Attachments = sendAttachments
  //   }
  // } catch (error) {
  //   isDev && console.log(error)
  //   throw createError(500, 'Error processing attachments.')
  // }

  try {
    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )

    // See note above about Attachments.
    // const splitMessages = splitUpLargeMessage(requestBody.Messages[0])
    // requestBody.Messages = [...splitMessages]
    // console.log(requestBody.Messages.length)
    // const messageSendRequests: Array<MailJetSendRequest> = splitMessages.map(
    //   (msg) => ({
    //     Messages: [{...msg}]
    //   })
    // )
    // const allPromises = await messageSendRequests.map((request) =>
    //   postMailJetRequest(request)
    // )
    // const data = await Promise.all(allPromises)

    const data = await postMailJetRequest(requestBody)
    return data
  } catch (error) {
    // isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

async function postMailJetRequest(requestBody: MailJetSendRequest) {
  // const result = await sendEmail.request(requestBody)
  // const {body} = result || {}
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
  // isDev &&
  //   console.log(
  //     'Mailjet sendMail post response: ',
  //     JSON.stringify(data, null, 2)
  //   )
  // return result // node-mailjet
  return data
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)
export default applyMiddleware(irrigCntrlRebateHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])
