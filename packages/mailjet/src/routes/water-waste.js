// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {type IncomingMessage} from 'http'
import * as yup from 'yup'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const waterWasteHandler = async (req: IncomingMessage) => {
  const body = await json(req)

  const bodySchema = yup
    .object()
    .required()
    .shape({
      formData: yup
        .object()
        .required()
        .shape({
          location: yup.string().required(),
          description: yup.string().required(),
          userInfo: yup.object().shape({
            email: yup.string(),
            phone: yup.string(),
            firstName: yup.string(),
            lastName: yup.string()
          })
        }),
      attachments: yup.array().of(yup.string()),
      recipients: yup
        .array()
        .required()
        .of(
          yup
            .object()
            .required()
            .shape({
              Name: yup.string().required(),
              Email: yup
                .string()
                .email()
                .required()
            })
        )
    })

  const isValid = await bodySchema.isValid(body)
  console.log('is valid', isValid)
  if (!isValid) {
    isDev && console.log('Body is not valid', JSON.stringify(body, null, 2))
    throw createError(400)
  }

  const sendEmail = Mailjet.post('send', {
    version: 'v3.1'
  })

  // "PCWA-No-Spam: webmaster@pcwa.net" is a email Header that is used to bypass Barracuda Spam filter.
  // We add it to all emails so that they don"t get caught.  The header is explicitly added to the
  // Barracuda via a rule Bryan H. added.

  const {recipients} = body
  const {reviewLink, title, email, score} = body.formData

  const requestBody = {
    Messages: [
      {
        From: {
          Email: MAILJET_SENDER,
          Name: 'PCWA Forms'
        },
        To: recipients,
        ReplyTo: {
          Email: email,
          Name: `${title} Examinee`
        },
        Headers: {
          'PCWA-No-Spam': 'webmaster@pcwa.net'
        },
        Subject: `${title} Exam Submitted`,
        TextPart: `${title} Exam Submitted\n${email} completed the ${title} Exam.\nScore: ${score}%\nYou can review this exam at ${reviewLink}`,
        HTMLPart: `<h2>${title} Exam Submitted</h2><br /><p>${email} completed the ${title} Exam.</p><br /><h3>Score: ${score}%</h3><br /><p>You can review this exam at <a href='${reviewLink}' target='blank'>${reviewLink}</a>.</p>`
      }
    ]
  }

  try {
    isDev && console.log('emailData: ', JSON.stringify(requestBody, null, 2))
    const result = await sendEmail.request(requestBody)
    isDev &&
      console.log(
        'sendMail post response: ',
        JSON.stringify(result.body, null, 2)
      )
    return result.body
  } catch (error) {
    // console.log(error)
    console.error('sendMail error status: ', error.statusCode)
    throw error
  }
}

export const requestHandler = async (req: IncomingMessage) => {
  try {
    needsApiKey(MAILJET_KEY)
    return await waterWasteHandler(req)
  } catch (error) {
    throw error
  }
}

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}

// export default mainHandler

// type MailJetAttachment = {
//   'Content-type': string,
//   Filename: string,
//   content: string
// }

// type MailJetEmail = {
//   FromEmail: string,
//   FromName: string,
//   Subject: string,
//   'MJ-TemplateLanguage'?: boolean,
//   'MJ-TemplateID'?: string,
//   Vars?: {},
//   Recipients: Array<{Email: string}>,
//   Inline_attachments?: Array<MailJetAttachment>,
//   Attachments?: Array<MailJetAttachment>,
//   Headers?: {[headerKey: string]: string}
// }
