// cspell:ignore cbarnhill
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
// import {attach, splitUpLargeMessage} from '../lib/mailjet-attachments'
import {string, object, array, Schema, date} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import checkReferrer from '@pcwa/micro-check-referrer'
import {format} from 'date-fns'
import limiter from '@pcwa/micro-limiter'
import {IncomingMessage} from 'http'
import {MailJetSendRequest} from '../lib/types'
import {
  postMailJetRequest,
  getRecaptcha,
  AttachmentFieldValue,
  emailRecipients,
  validateSchema
} from '../lib/rebate-forms'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 879852

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
  treatedCustomer: '' | 'Yes' | 'No'
  existingHigh: '' | 'Yes' | 'No'
  newConstruction: '' | 'Yes' | 'No'
  manufacturer: string
  model: string
  ceeQualify: string
  termsAgree: string
  signature: string
  captcha: string
  receipts: AttachmentFieldValue[]
  installPhotos: AttachmentFieldValue[]
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
        treatedCustomer: string()
          .required()
          .oneOf(
            ['Yes'] // "Yes", "No"
          ),
        existingHigh: string()
          .required()
          .oneOf(
            ['No'] // "Yes", "No"
          ),
        newConstruction: string()
          .required()
          .oneOf(
            ['No'] // "Yes", "No"
          ),
        manufacturer: string().required(),
        model: string().required(),
        ceeQualify: string().required(),
        termsAgree: string()
          .required()
          .oneOf(['true']),
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
        installPhotos: array()
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
          )
      })
  })

const washingMachineRebateHandler = async (req: IncomingMessage) => {
  const data: any = await json(req)
  const body: {
    formData: FormDataObj
    recipients: {Name: string; Email: string}[]
  } = data

  await validateSchema(bodySchema, body)

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
    receipts,
    installPhotos,
    termsAgree,
    signature,
    captcha,
    treatedCustomer,
    existingHigh,
    newConstruction,
    ceeQualify
  } = formData
  let {city = '', accountNo} = formData

  // Remove leading zeros from account number.
  accountNo = accountNo
    .split('-')
    .map((part) => part.replace(/^[0]+/g, ''))
    .join('-')

  // Only validate recaptcha key in production.
  if (!isDev) {
    const recaptcha = getRecaptcha()
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

  const receiptImages = receipts.map((attachment) => attachment.url)
  const installImages = installPhotos.map((attachment) => attachment.url)

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
        To: [...emailRecipients],
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
          manufacturer,
          model,
          treatedCustomer,
          existingHigh,
          newConstruction,
          ceeQualify,
          submitDate: format(new Date(), 'MMMM do, yyyy'),
          receiptImages,
          installImages,
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
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)

export default applyMiddleware(washingMachineRebateHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])
