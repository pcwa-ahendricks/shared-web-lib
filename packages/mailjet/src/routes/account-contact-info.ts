// cspell:ignore maint
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
import {MailJetSendRequest} from '../lib/types'
import {
  getRecaptcha,
  emailRecipientsCsMaint,
  validateSchema
} from '../lib/forms'
import {postMailJetRequest} from '../lib/mailjet'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 951337

interface FormDataObj {
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
  signature: string
  captcha: string
}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        name: string()
          .required()
          .max(30),
        spouseName: string().max(27),
        email: string().email(),
        accountNo: string()
          .matches(/^\d+-\d+$/)
          .required(),
        address: string()
          .required()
          .max(30),
        previousAddress: string().max(60),
        city: string().required(),
        state: string().required(),
        zipCode: string().required(),
        phone: string().min(10),
        cellPhone: string().min(10),
        workPhone: string().min(10),
        spousePhone: string().min(10),
        signature: string().required(),
        captcha: string().required()
      })
  })

const accountContactInfoHandler = async (req: IncomingMessage) => {
  const data: any = await json(req)
  const body: {
    formData: FormDataObj
    recipients: {Name: string; Email: string}[]
  } = data

  await validateSchema(bodySchema, body)

  const {formData} = body
  const {
    name,
    spouseName,
    address,
    previousAddress,
    email,
    city,
    state,
    zipCode,
    phone,
    cellPhone,
    workPhone,
    spousePhone,
    signature,
    captcha
  } = formData
  let {accountNo} = formData

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
        To: [{Email: email, Name: name}, ...emailRecipientsCsMaint],
        ReplyTo: {
          Email: email,
          Name: name
        },
        Headers: {
          'PCWA-No-Spam': 'webmaster@pcwa.net'
        },
        Subject: 'PCWA - Customer Contact Information Change',
        TemplateID: MAILJET_TEMPLATE_ID,
        TemplateLanguage: true,
        Variables: {
          name,
          accountNo,
          spouseName,
          address,
          previousAddress,
          email,
          city,
          state,
          zipCode,
          phone,
          cellPhone,
          workPhone,
          spousePhone,
          signature,
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
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

const acceptReferrer = isDev ? /.+/ : /^https:\/\/(.*\.)?pcwa\.net(\/|$)/i
const limiterMaxRequests = isDev ? 3 : 10 // production 10 requests (dev 3 req.)
const limiterInterval = isDev ? 30 * 1000 : 5 * 60 * 1000 // production 5 min interval (dev 30sec)

export default applyMiddleware(accountContactInfoHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])
