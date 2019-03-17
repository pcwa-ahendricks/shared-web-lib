// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {string, object, array} from 'yup'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'
import {type IncomingMessage} from 'http'
import {type MailJetSendRequest} from '../lib/types'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .required()
      .shape({
        score: string().required(),
        email: string()
          .email()
          .required(),
        reviewLink: string()
          .url()
          .required(),
        title: string().required()
      }),
    recipients: array()
      .required()
      .of(
        object()
          .required()
          .shape({
            Name: string().required(),
            Email: string()
              .email()
              .required()
          })
      )
  })

const postFormExamSubmit = async (req: IncomingMessage) => {
  const body = await json(req)

  const isValid = await bodySchema.isValid(body)
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

  const requestBody: MailJetSendRequest = {
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
    const result = await sendEmail.request(requestBody)
    isDev && console.log('sendMail post response: ', result.body)
    return result.body
  } catch (error) {
    isDev && console.log(error)
    console.error('sendMail error status: ', error.statusCode)
    throw error
  }
}

export default applyMiddleware(postFormExamSubmit, [
  unauthorized(MAILJET_KEY, 'Invalid API key')
])
