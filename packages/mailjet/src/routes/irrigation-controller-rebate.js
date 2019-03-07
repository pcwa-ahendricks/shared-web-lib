// @flow
const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  require('dotenv-safe').config()
}
import {createError, json} from 'micro'
import {type IncomingMessage} from 'http'
import {string, object, array} from 'yup'
import * as Jimp from 'jimp'
import {parse} from 'path'
import {existsSync} from 'fs'
import {getType} from 'mime'

const MAILJET_KEY = process.env.NODE_MAILJET_KEY || ''
const MAILJET_SECRET = process.env.NODE_MAILJET_SECRET || ''
const MAILJET_SENDER = process.env.NODE_MAILJET_SENDER || ''

const Mailjet = require('node-mailjet').connect(MAILJET_KEY, MAILJET_SECRET)

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
    recipients: array()
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
      .required()
  })

export const irrigCntrlRebateHandler = async (req: IncomingMessage) => {
  needsApiKey(MAILJET_KEY)
  const body: {
    formData: FormData,
    attachments: Array<string>,
    recipients: Array<{Name: string, Email: string}>
  } = await json(req)

  const isValid = await bodySchema.isValid(body)
  if (!isValid) {
    isDev && console.log('Body is not valid', JSON.stringify(body, null, 2))
    throw createError(400)
  }

  const sendEmail = Mailjet.post('send', {
    version: 'v3.1'
  })

  const {recipients, formData, attachments} = body
  const {email, accountNo} = formData

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
        To: recipients,
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

const needsApiKey = (key: string) => {
  if (!key) {
    throw createError(401, 'Unauthorized - Invalid API key')
  }
}

// export default mainHandler

type MailJetAttachment = {
  ContentType: string,
  Filename: string,
  Base64Content: string
}

type MailJetMessage = {|
  From: {
    Name: string,
    Email: string
  },
  Subject: string,
  ReplyTo?: {
    Name?: string,
    Email: string
  },
  TemplateLanguage?: boolean,
  TemplateID?: number,
  Variables?: {},
  To: Array<{Email: string, Name: string}>,
  InlinedAttachments?: Array<MailJetAttachment>,
  Attachments?: Array<MailJetAttachment>,
  Headers?: {[headerKey: string]: string},
  HTMLPart?: string,
  TextPart?: string
|}

type MailJetSendRequest = {
  Messages: Array<MailJetMessage>
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

    reqAttachments.forEach(async (localFilePath: string) => {
      // We are supplying full path in attachments. So this isn't needed.
      // const localFilePath = join(UPLOADS_DIR, ATTACHMENT_DIR, filename)
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
          bufferToBase64(err, buffer, parse(localFilePath).base, mimeType)
        })
      } catch (error) {
        console.log(error)
        throw error
      }
    }) // forEach
  })
}
