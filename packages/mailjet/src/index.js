// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, send, json} from 'micro'
import {type ServerResponse, type IncomingMessage} from 'http'
import {noCache} from '../../util/dist'
import {router, get} from 'micro-fork'

const hello = (req, res) => send(res, 200, `Hello ${req.params.who}`)
const notfound = (req, res) => send(res, 404)

module.exports = router()(get('/hello/:who', hello), get('/*', notfound))

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const postFormExamSubmit = async (req: IncomingMessage) => {
  const body = await json(req)

  // if no body or no body.formData is not included send a 404
  if (!body || !body.formData || !(Object.keys(body.formData).length > 0)) {
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

  let emailData = {
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
    const result = await sendEmail.request(emailData)
    console.log('sendMail post response: ', result.body)
    return result.body
  } catch (error) {
    console.log(error)
    console.error('sendMail error status: ', error.statusCode)
    throw createError(404)
  }
}

const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    needsApiKey(MAILJET_KEY)
    switch (true) {
      // Don't do anything with favicon request.
      case /\/favicon(\.ico)?($|\?)/i.test(req.url): {
        send(res, 204)
        break
      }
      default: {
        return await postFormExamSubmit(req)
      }
    }
  } catch (error) {
    throw error
  }
}

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}

/**
 * Check the request method and use postHandler or getHandler (or other method handlers)
 */
const methodHandler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return await requestHandler(req, res)
      default:
        send(res, 405, 'Method Not Allowed')
        break
    }
  } catch (error) {
    throw error
  }
}

const mainHandler = async (req: IncomingMessage, res: ServerResponse) => {
  res = noCache(res) // set no cache headers
  try {
    send(res, 200, await methodHandler(req, res))
  } catch (error) {
    // "If an error is thrown and not caught by you, the response will automatically be 500. Important: Error stacks will be printed as console.error and during development mode (if the env variable NODE_ENV is 'development'), they will also be included in the responses.". --zeit
    throw error
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
