// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {attach} from '../lib/mailjet-attachments'
import {string, object, array} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '../lib/micro-unauthorized'
import checkReferrer from '../lib/micro-check-referrer'
import reCAPTCHA from 'recaptcha2'
import {type IncomingMessage} from 'http'
import {type MailJetSendRequest, type MailJetMessage} from '../lib/types'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''
const RECAPTCHA_SITE_KEY = process.env.NODE_RECAPTCHA_SITE_KEY || ''
const RECAPTCHA_SECRET_KEY = process.env.NODE_RECAPTCHA_SECRET_KEY || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const recaptcha = new reCAPTCHA({
  siteKey: RECAPTCHA_SITE_KEY,
  secretKey: RECAPTCHA_SECRET_KEY
})

const RECIPIENTS: $PropertyType<MailJetMessage, 'To'> = isDev
  ? [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]
  : [{Name: 'Abe', Email: 'ahendricks@pcwa.net'}]

type FormData = {|
  email: string,
  accountNo: string
|}

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .camelCase()
      .required()
      .shape({
        email: string()
          .email()
          .required(),
        accountNo: string().required()
      }),
    attachments: array()
      .of(string())
      .required(),
    recaptchaKey: string().required()
    // recipients: array()
    //   .of(
    //     object()
    //       .required()
    //       .shape({
    //         Name: string().required(),
    //         Email: string()
    //           .email()
    //           .required()
    //       })
    //   )
    //   .required()
  })

const irrigCntrlRebateHandler = async (req: IncomingMessage) => {
  const body: {
    formData: FormData,
    attachments: Array<string>,
    recipients: Array<{Name: string, Email: string}>,
    recaptchaKey: string
  } = await json(req)

  const isValid = await bodySchema.isValid(body)
  if (!isValid) {
    isDev && console.log('Body is not valid', JSON.stringify(body, null, 2))
    throw createError(400)
  }

  const sendEmail = Mailjet.post('send', {
    version: 'v3.1'
  })

  const {formData, attachments, recaptchaKey} = body
  const {email, accountNo} = formData

  try {
    await recaptcha.validate(recaptchaKey)
    isDev && console.log('Recaptcha key validated')
  } catch (error) {
    const translatedErrors = recaptcha.translateErrors(error) // translate error codes to human readable text
    isDev && console.log('Recaptcha key is invalid', translatedErrors)
    throw createError(400, translatedErrors)
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
        Subject: 'Weather Based Irrigation Controller Rebate - PCWA.net',
        TextPart: `This is just a test for Account Number ${accountNo}`,
        HTMLPart: `<h2>This is just a test</h2><br /><p>for Account Number ${accountNo}</p><br />`,
        TemplateLanguage: false
      }
    ]
  }

  try {
    const sendAttachments = await attach(attachments)
    if (sendAttachments.length > 0) {
      requestBody.Messages[0].Attachments = sendAttachments
    }
  } catch (error) {
    isDev && console.log(error)
    throw createError(500, 'Error processing attachments.')
  }

  try {
    // isDev &&
    //   console.log(
    //     'Mailjet Request Body: ',
    //     JSON.stringify(requestBody, null, 2)
    //   )
    const result = await sendEmail.request(requestBody)
    isDev &&
      console.log(
        'Mailjet sendMail post response: ',
        JSON.stringify(result.body, null, 2)
      )
    return result.body
  } catch (error) {
    isDev && console.log(error)
    console.error('Mailjet sendMail error status: ', error.statusCode)
    throw error
  }
}

const acceptReferrer = isDev ? /.+/ : /^https.*\.pcwa\.net\/.*/i
export default applyMiddleware(irrigCntrlRebateHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key'),
  checkReferrer(acceptReferrer, 'Reporting abuse')
])
