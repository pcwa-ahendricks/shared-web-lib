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

const postFormExamSubmit = async (req: IncomingMessage) => {
  const body = await json(req)

  const bodySchema = yup
    .object()
    .required()
    .shape({
      formData: yup
        .object()
        .required()
        .shape({
          score: yup.string().required(),
          email: yup
            .string()
            .email()
            .required(),
          reviewLink: yup
            .string()
            .url()
            .required(),
          title: yup.string().required()
        }),
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
    const response = await sendEmail.request(requestBody)
    isDev && console.log('sendMail post response: ', response.body)
    return response.body
  } catch (error) {
    isDev && console.log(error)
    console.error('sendMail error status: ', error.statusCode)
    throw error
  }
}

export const requestHandler = async (req: IncomingMessage) => {
  try {
    needsApiKey(MAILJET_KEY)
    return await postFormExamSubmit(req)
  } catch (error) {
    throw error
  }
}

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}
