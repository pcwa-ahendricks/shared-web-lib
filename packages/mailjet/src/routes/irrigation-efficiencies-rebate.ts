// cspell:ignore addtl cbarnhill truthy
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {string, object, StringSchema} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import checkReferrer from '@pcwa/micro-check-referrer'
import {format} from 'date-fns'
import limiter from '@pcwa/micro-limiter'
import {IncomingMessage} from 'http'
import {MailJetSendRequest, MailJetMessage} from '../lib/types'
import {
  getRecaptcha,
  emailRecipientsIrrigation,
  validateSchema
} from '../lib/rebate-forms'
import {postMailJetRequest} from '../lib/mailjet'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const MAILJET_TEMPLATE_ID = 762551

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
  irrigMethod: string
  upgradeLocations: {
    [key: string]: boolean
  }
  upgradeOpts: {
    [key: string]: boolean
  }
  termsAgree: string
  inspectAgree: string
  signature: string
  captcha: string
  comments: string
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
          (city: string | undefined, schema: StringSchema) =>
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
        termsAgree: string()
          .required()
          .oneOf(['true']),
        inspectAgree: string()
          .required()
          .oneOf(['true']),
        signature: string().required(),
        captcha: string().required(),
        comments: string().max(200),
        irrigMethod: string()
          .required()
          .notOneOf(['Hand water']), // Case sensitive
        upgradeLocations: object()
          .required()
          .test(
            'has-one-location-option',
            'upgradeLocations has no truth',
            hasTrueValue
          ),
        upgradeOpts: object()
          .required()
          .test(
            'has-one-upgrade-option',
            'upgradeOpts has no truth',
            hasTrueValue
          )
      })
  })

const irrigEffRebateHandler = async (req: IncomingMessage) => {
  const data: any = await json(req)
  const body: {
    formData: FormDataObj
    recipients: MailJetMessage['To']
  } = data

  await validateSchema(bodySchema, body)

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
    treatedCustomer,
    irrigMethod,
    upgradeLocations,
    upgradeOpts,
    termsAgree,
    signature,
    captcha,
    comments = ''
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

  const mappedUpgradeLocations = mapTruthyKeys(upgradeLocations)
  const mappedUpgradeOpts = mapTruthyKeys(upgradeOpts)

  const replyToName = `${firstName} ${lastName}`

  const commentsLength = comments.length

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
        To: [...emailRecipientsIrrigation],
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
          treatedCustomer,
          irrigMethod,
          upgradeLocations: mappedUpgradeLocations,
          upgradeOpts: mappedUpgradeOpts,
          submitDate: format(new Date(), 'MMMM do, yyyy'),
          termsAgree,
          signature,
          comments,
          commentsLength
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
export default applyMiddleware(irrigEffRebateHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse'),
  limiter(limiterMaxRequests, limiterInterval)
])

function hasTrueValue(value: any): boolean {
  return (
    value &&
    typeof value === 'object' &&
    Object.keys(value).some((chkBoxVal) => value[chkBoxVal] === true)
  )
}

function mapTruthyKeys(obj: any) {
  return Object.keys(obj)
    .map((key) => {
      if (obj[key] === true) {
        return key
      } else {
        return null
      }
    })
    .filter(Boolean)
}
