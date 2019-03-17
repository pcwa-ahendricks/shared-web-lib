// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {type IncomingMessage} from 'http'
import {type MailJetSendRequest, type MailJetAttachment} from '../lib/types'
import {object, string, array} from 'yup'
import Jimp from 'jimp'
import {join, parse} from 'path'
import {existsSync} from 'fs'
import {getType} from 'mime'
import {UPLOADS_DIR} from '../index'
import {applyMiddleware} from 'micro-middleware'
import unauthorized from '@pcwa/micro-unauthorized'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const ATTACHMENT_DIR = 'waste_wtr_attachment'

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

const bodySchema = object()
  .required()
  .shape({
    formData: object()
      .required()
      .shape({
        location: string().required(),
        description: string().required(),
        userInfo: object().shape({
          email: string(),
          phone: string(),
          firstName: string(),
          lastName: string()
        })
      }),
    attachments: array().of(string()),
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

const waterWasteHandler = async (req: IncomingMessage) => {
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

  const {recipients, formData, attachments} = body
  const variables = flatten({...formData})

  // incoming attachments should be array of strings
  // console.log("Request Parameter for "attachments": ", reqAttachments)
  // let sendAttachments: Array<MailJetAttachment> = [] // array container for MailJet attachments.

  const requestBody: MailJetSendRequest = {
    Messages: [
      {
        From: {
          Email: MAILJET_SENDER,
          Name: 'PCWA Mailjet'
        },
        To: [...recipients],
        Subject: 'Water Waste Notification - PCWA.net',
        TemplateLanguage: true,
        TemplateID: 82714,
        Variables: variables,
        Headers: {'PCWA-No-Spam': 'webmaster@pcwa.net'}
      }
    ]
  }

  // Conditionally add ReplyTo to Mailjet request body if user supplied an email address, name is optional.
  const name =
    variables.firstName || variables.lastName
      ? `${variables.firstName || ''} ${variables.lastName || ''}`.trim()
      : null
  if (variables.email) {
    requestBody.Messages[0].ReplyTo = {
      Email: variables.email
    }
    // Name is not required. Add it if it is supplied.
    if (name) {
      requestBody.Messages[0].ReplyTo = {
        ...requestBody.Messages[0].ReplyTo,
        Name: name
      }
    }
  }

  // Use Reply-To if email address was submitted in post request.
  // if (formData && formData.userInfo && formData.userInfo.email) {
  //   if (requestBody.Headers) {
  //     requestBody.Headers['Reply-To'] = formData.userInfo.email
  //   } else {
  //     requestBody.Headers = {}
  //     requestBody.Headers['Reply-To'] = formData.userInfo.email
  //   }
  // }

  // const requestBody = {
  //   Messages: [
  //     {
  //       From: {
  //         Email: MAILJET_SENDER,
  //         Name: 'PCWA Forms'
  //       },
  //       To: recipients,
  //       ReplyTo: {
  //         Email: email,
  //         Name: `${title} Examinee`
  //       },
  //       Headers: {
  //         'PCWA-No-Spam': 'webmaster@pcwa.net'
  //       },
  //       Subject: `${title} Exam Submitted`,
  //       TextPart: `${title} Exam Submitted\n${email} completed the ${title} Exam.\nScore: ${score}%\nYou can review this exam at ${reviewLink}`,
  //       HTMLPart: `<h2>${title} Exam Submitted</h2><br /><p>${email} completed the ${title} Exam.</p><br /><h3>Score: ${score}%</h3><br /><p>You can review this exam at <a href='${reviewLink}' target='blank'>${reviewLink}</a>.</p>`
  //     }
  //   ]
  // }

  try {
    const sendAttachments = await attach(attachments)
    // console.log("Promise resolved: ", val)
    // Just add the Inline_attachments property if we have attachments (seems optional, but more explicit).
    if (sendAttachments.length > 0) {
      requestBody.Messages[0].InlinedAttachments = sendAttachments
    }
  } catch (error) {
    isDev && console.log(error)
    throw createError(500, 'Error processing attachments.')
  }

  try {
    isDev &&
      console.log(
        'Mailjet Request Body: ',
        JSON.stringify(requestBody, null, 2)
      )
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

function flatten(obj: any) {
  return Object.keys(obj).reduce((acc, current) => {
    const _key = `${current}`
    const currentValue = obj[current]
    if (Array.isArray(currentValue) || Object(currentValue) === currentValue) {
      Object.assign(acc, flatten(currentValue))
    } else {
      acc[_key] = currentValue
    }
    return acc
  }, {})
}

const attach = (reqAttachments) => {
  const attachments: Array<MailJetAttachment> = []
  return new Promise((resolve) => {
    // end immediately if attachments were not provided in body
    if (!reqAttachments || reqAttachments.length === 0) {
      resolve(attachments)
    }
    let resolveAtLength = reqAttachments.length

    function pushAttachment(filename: string, mimeType: string, b64: string) {
      const attachment = {
        Filename: parse(filename).base,
        ContentType: mimeType,
        Base64Content: b64
      }
      console.log('pushing attachment', attachment)
      attachments.push(attachment)
      return true
    }
    function checkResolve() {
      // console.log("comparing attachment length to supplied request attachments length: ", attachments.length, resolveAtLength)
      if (attachments.length === resolveAtLength) {
        resolve(attachments)
      }
    }
    function handleError(err: string) {
      /* We work around bad/not-found images by proceeding w/out instead of ending the response. */
      // res.status(403).send("Specified file attachment(s) not found.")
      // res.status(500).send("Problem encountered during image processing.")
      console.warn(err)
      resolveAtLength--
      checkResolve()
    }
    function bufferToBase64(
      err: Error,
      buffer: Buffer,
      val: string,
      mimeType: string
    ) {
      if (err) {
        console.log(err)
        handleError('Problem during resize/file -> buffer operation: ')
        return // return from this function (ie. don"t call toString() on invalid buffer and so on) on error.
      }
      const b64 = buffer.toString('base64')
      pushAttachment(val, mimeType, b64)
      checkResolve()
    }

    reqAttachments.forEach(async (filename: string) => {
      const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
      if (!existsSync(localFilePath)) {
        handleError(
          `Can't find specified file attachment at "${localFilePath}".`
        )
        return
      }

      const mimeType = getType(localFilePath)

      // Jimp works with Now. GM and Sharp didn't.
      try {
        const image = await Jimp.read(localFilePath)
        image.resize(800, Jimp.AUTO).getBuffer(mimeType, (err, buffer) => {
          bufferToBase64(err, buffer, filename, mimeType)
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) // forEach
  })
}

export default applyMiddleware(waterWasteHandler, [
  unauthorized(MAILJET_KEY, 'Invalid API key')
])
