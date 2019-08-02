// cspell:ignore customerservices pcwamain
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {string, object} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import checkReferrer from '@pcwa/micro-check-referrer'
import {format} from 'date-fns'
import limiter from '@pcwa/micro-limiter'
import {IncomingMessage} from 'http'
import {MailJetSendRequest, MailJetMessage} from '../lib/types'
import {getRecaptcha, validateSchema} from '../lib/forms'
import {postMailJetRequest} from '../lib/mailjet'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 848345

// Additional email addresses are added to array below.
const SA_RECIPIENTS: MailJetMessage['To'] = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [
      {Name: 'Abe', Email: 'webmaster@pcwa.net'},
      {Name: 'PCWA Webmaster', Email: 'pcwamain@gmail.com'}
    ]

interface FormDataObj {
  name: string
  message: string
  email: string
  subject: string
  reason: string
  phone: string
  captcha: string
}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        reason: string().required(),
        message: string().required(),
        captcha: string().required(
          'Checking this box is required for security purposes'
        ),
        subject: string().required(),
        name: string(),
        email: string().email(),
        phone: string().min(10)
      })
  })

const ContactUsHandler = async (req: IncomingMessage) => {
  const data: any = await json(req)
  const body: {
    formData: FormDataObj
    recipients: {Name: string; Email: string}[]
  } = data

  await validateSchema(bodySchema, body)

  // const sendEmail = Mailjet.post('send', {
  //   version: 'v3.1'
  // })

  const {formData} = body
  const {email, name, phone, reason, message, subject = '', captcha} = formData

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

  const mainRecipients: MailJetMessage['To'] = isDev
    ? []
    : subject.toLowerCase() === 'clerk to the board'
    ? [{Email: 'clerk@pcwa.net', Name: 'Clerk'}]
    : [{Email: 'customerservices@pcwa.net', Name: 'Customer Services'}]

  // If user specified an email address include it as a cc.
  const ccRecipients: MailJetMessage['To'] = email
    ? [{Email: email, Name: name ? name : email}]
    : []

  const toRecipients: MailJetMessage['To'] = [
    ...SA_RECIPIENTS,
    ...mainRecipients,
    ...ccRecipients
  ]

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
        To: [...toRecipients],
        ReplyTo: email
          ? {
              Email: email,
              Name: name ? name : email
            }
          : undefined,
        Headers: {
          'PCWA-No-Spam': 'webmaster@pcwa.net'
        },
        Subject: 'Contact Us - PCWA.net',
        TemplateID: MAILJET_TEMPLATE_ID,
        TemplateLanguage: true,
        Variables: {
          email,
          name,
          phone,
          reason,
          message,
          subject,
          submitDate: format(new Date(), 'MMMM do, yyyy')
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

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)

export default applyMiddleware(ContactUsHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])
